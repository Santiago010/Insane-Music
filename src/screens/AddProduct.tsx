import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  BackgroundPatternGenerator,
  Canvas,
  Controls,
} from 'react-background-pattern-generator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductsContext} from '../context/productsContext/productsContext';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useAnimation} from '../hooks/useAnimation';
import {useForm} from '../hooks/useForm';
import {InfoCategoria, ResPublishProduct} from '../interfaces/interfacesApp';
import {
  borderRadiusGlobal,
  btnSendGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
} from '../theme/GlobalTheme';
import {getCategories} from '../utils/getCategories';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MessageThanks} from '../components/MessageThanks';
import {Background} from '../components/Background';
import {Background2} from '../components/Background2';
import Icon from 'react-native-vector-icons/Ionicons';
import {Loading} from './Loading';
import {DeviceDimensions} from '../helpers/DeviceDimensions';

export const AddProduct = () => {
  const {heightWindow, widthWindow} = DeviceDimensions();
  const navigation = useNavigation();
  const [newProduct, setNewProduct] = useState<ResPublishProduct>();
  const {position, startMovingPosition} = useAnimation();
  const [loading, setLoading] = useState(false);
  const {categoria, nombre, precio, onChange, form} = useForm({
    categoria: '',
    nombre: '',
    precio: '',
  });
  const [categories, setCategories] = useState<InfoCategoria[] | undefined>([]);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {addProduct, uploadImage} = useContext(ProductsContext);
  const {top} = useSafeAreaInsets();
  const [tempUri, setTempUri] = useState<string>('');

  useEffect(() => {
    startMovingPosition(-350, 900);
    getCategories().then(data => setCategories(data));
  }, []);

  const publishProduct = () => {
    setLoading(true);
    addProduct(categoria, nombre, precio).then(data => {
      console.log(data?._id);
      setNewProduct(data);
    });
    setLoading(false);
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      async res => {
        if (res.didCancel) return;

        setTempUri(res.assets[0].uri);
        console.log(res);
        try {
          const resp = await uploadImage(res, newProduct?._id);
          console.log(resp);
          Alert.alert(
            `${newProduct?.nombre} publicado`,
            '✌ Gracias por aportar un granito para atender la inevitable perplejidad de la realidad ✌',
            [
              {
                text: 'OK',
                onPress: navigation.navigate('StackProducts'),
              },
            ],
          );
        } catch (error) {}
      },
    );
  };

  return (
    <ScrollView>
      <Background2 />
      <View
        style={{
          backgroundColor: colors.primary,
          paddingBottom: 20,
          ...borderRadiusGlobal,
        }}>
        <Text
          style={{
            marginTop: top,
            ...marginGlobalHorizontal,
            color: colors.text,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          Nueva Publicación
        </Text>
      </View>
      {!newProduct ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, ...marginGlobalHorizontal}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
              {/* <MessageThanks /> */}
              <Text
                style={{
                  color: colors.text,
                  fontSize: 22,
                  ...marginGlobalVertical,
                }}>
                Escoja una Categoría
              </Text>
              <View
                style={{
                  backgroundColor: colors.card,
                  opacity: 0.5,
                  ...borderRadiusGlobal,
                }}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={itemValue => onChange(itemValue, 'categoria')}>
                  {categories?.map(({nombre: nombreCat, _id}) => (
                    <Picker.Item
                      color={colors.text}
                      label={nombreCat}
                      value={_id}
                      key={_id}
                    />
                  ))}
                </Picker>
              </View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 22,
                  ...marginGlobalVertical,
                }}>
                Ingrese el titulo de su publicacion
              </Text>
              <TextInput
                style={{
                  ...styles.inputs,
                  color: colors.text,
                  backgroundColor: colors.card,
                }}
                placeholder={`...`}
                placeholderTextColor={colors.text}
                autoCapitalize={'words'}
                value={nombre}
                onChangeText={value => onChange(value, 'nombre')}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 22,
                  ...marginGlobalVertical,
                }}>
                Ingrese el precio de su publicacion
              </Text>
              <TextInput
                style={{
                  ...styles.inputs,
                  color: colors.text,
                  backgroundColor: colors.card,
                }}
                placeholder={`...`}
                placeholderTextColor={colors.text}
                value={precio}
                keyboardType="number-pad"
                onChangeText={value => onChange(value, 'precio')}
              />
              <TouchableOpacity
                style={{
                  ...btnSendGlobal,
                  backgroundColor: colors.primary,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                activeOpacity={0.7}
                onPress={() => publishProduct()}>
                <Icon name="bonfire" size={22} />
                <Text style={{color: colors.text, fontSize: 18}}>
                  Subir Publicación
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <>
          {loading && <Loading />}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => takePhoto()}
              style={{
                ...btnSendGlobal,
                backgroundColor: colors.primary,
                flexDirection: 'row',
                justifyContent: 'center',
                ...marginGlobalVertical,
              }}
              activeOpacity={0.5}>
              <Icon name="cloud-upload" size={30} color={colors.text} />
              <Text style={{color: colors.text, fontSize: 18}}>
                Tomar una foto
              </Text>
            </TouchableOpacity>
            {tempUri && (
              <Image
                source={{uri: tempUri}}
                style={{
                  marginTop: 10,
                  ...borderRadiusGlobal,
                  width: widthWindow * 0.6,
                  height: heightWindow * 0.2,
                }}
              />
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputs: {
    opacity: 0.3,
    fontSize: 20,
    paddingVertical: 13,
    ...borderRadiusGlobal,
    ...marginGlobalVertical,
    paddingHorizontal: 5,
  },
});
