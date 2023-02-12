import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
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

  const {loadProductForGender} = useContext(ProductsContext);
  const [isVisible, setIsVisible] = useState(false);
  const [productos, setProductos] = useState<
    ResProductsForGender[] | undefined
  >();
  const {categories} = useCategories();
  const {generos, getGeneros} = useGeneros();

  const setCategoria = (value: string) => {
    onChange(value, 'categoria');
  };

  const setGenero = (value: string) => {
    onChange(value, 'genero');
  };

  const filtrar = () => {
    console.log(form);
    loadProductForGender(genero).then(data => setProductos(data));
    setIsVisible(false);
  };

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
        }
        ListFooterComponent={
          <View
            style={{
              height: 188,
              width: widthWindow,
            }}
          />
        }
        data={productos}
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
        renderItem={({item}) => (
          <View>
            <Image
              source={{uri: item.imgs[0]}}
              style={{
                width: widthWindow * 0.4,
                height: heightWindow * 0.4,
                ...borderRadiusGlobal,
              }}
            />
            <Text>{item.nombre}</Text>
          </View>
        )}
        onEndReachedThreshold={0.5}
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
