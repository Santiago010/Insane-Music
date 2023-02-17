import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useForm} from '../hooks/useForm';
import {
  borderRadiusGlobal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ModalFilter} from '../components/ModalFilter';
import {useCategories} from '../hooks/useCategories';
import {useGeneros} from '../hooks/useGeneros';
import {ProductsContext} from '../context/productsContext/productsContext';
import {ResProductsForGender} from '../interfaces/interfacesApp';
import {FlatList} from 'react-native-gesture-handler';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {Card2} from '../components/Card2';
import {useDebounce} from '../hooks/useDebounce';

const SearchProduct = () => {
  const {nombre, genero, categoria, onChange, form} = useForm({
    nombre: '',
    categoria: '',
    genero: '',
  });
  const {top} = useSafeAreaInsets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {widthWindow, heightWindow} = DeviceDimensions();

  const {loadProductForGenderT} = useContext(ProductsContext);
  const [isVisible, setIsVisible] = useState(false);
  const [productos, setProductos] = useState<unknown>();
  const {categories} = useCategories();
  const {generos, getGeneros} = useGeneros();
  const debounce = useDebounce({input: nombre, time: 500});
  const [term, setTerm] = useState('');
  const [productsFiltered, setProductFiltered] = useState<unknown>([]);

  const setCategoria = (value: string) => {
    onChange(value, 'categoria');
  };

  const setGenero = (value: string) => {
    onChange(value, 'genero');
  };

  const filtrar = () => {
    console.log(form);
    loadProductForGenderT(genero)
      .then(data => {
        setProductos(data);
      })
      .catch(err => {
        console.error(err);
        Alert.alert(
          '¡Atención!',
          `Hubo un error de internet`,
          [
            {
              onPress: () => {},
            },
          ],
          {
            cancelable: true,
          },
        );
      });
    setProductFiltered([]);
    setIsVisible(false);
  };

  useEffect(() => {
    if (productos?.length > 0) {
      setProductFiltered(productos);
    }
  }, [productos]);

  useEffect(() => {
    if (term.length === 0) {
      setProductFiltered([]);
    }

    setProductFiltered(
      productos?.filter(product => product.nombre.toLowerCase().includes(term)),
    );
  }, [term]);

  useEffect(() => {
    setTerm(debounce);
  }, [debounce]);

  useEffect(() => {
    if (categories) {
      onChange(categories[0]._id, 'categoria');
    }
  }, [categories]);

  useEffect(() => {
    if (categoria.length > 0) {
      getGeneros(categoria);
    }
  }, [categoria]);

  useEffect(() => {
    if (generos) {
      onChange(generos[0]._id, 'genero');
    }
  }, [generos]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <View>
            <View
              style={{
                ...styles.containerSearch,
                marginTop: top,
                backgroundColor: colors.card,
                ...borderRadiusGlobal,
                ...shadowGlobal,
              }}>
              <TextInput
                style={{
                  ...styles.inputs,
                  color: colors.text,
                }}
                placeholder={'Ingrese el nombre de la publicación'}
                placeholderTextColor={colors.text}
                value={nombre}
                onChangeText={value => onChange(value, 'nombre')}
              />
              <Icon name="search" color={colors.primary} size={22} />
              <TouchableOpacity
                onPress={() => setIsVisible(true)}
                activeOpacity={0.5}
                style={{
                  backgroundColor: colors.primary,
                  padding: 10,
                  ...borderRadiusGlobal,
                }}>
                <Icon name="filter" color={colors.text} size={22} />
              </TouchableOpacity>
            </View>
            {productos?.length === 0 && (
              <Text
                style={{
                  color: colors.text,
                  fontSize: 22,
                  textAlign: 'center',
                  ...marginGlobalVertical,
                }}>
                🤕¡Sin Resultados!
              </Text>
            )}
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              height: 188,
              width: widthWindow,
            }}
          />
        }
        data={productsFiltered}
        keyExtractor={({_id}) => _id}
        numColumns={2}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: heightWindow * 0.1,
              width: widthWindow,
            }}
          />
        )}
        renderItem={({item}) => <Card2 item={item} />}
      />
      <ModalFilter
        visible={isVisible}
        hideModal={() => setIsVisible(false)}
        categories={categories}
        generos={generos}
        genero={genero}
        categoria={categoria}
        setCategoria={setCategoria}
        setGenero={setGenero}
        filtrar={filtrar}
      />
    </View>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    width: '80%',
    opacity: 0.3,
    fontSize: 18,
    paddingVertical: 13,
    ...borderRadiusGlobal,
    ...marginGlobalVertical,
    paddingHorizontal: 5,
  },
});
