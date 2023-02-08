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
  CheckBo,
  Switch,
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
import {PacmanIndicator} from 'react-native-indicators';
import {
  Genero,
  InfoCategoria,
  ResPublishProduct,
} from '../interfaces/interfacesApp';
import {
  borderRadiusGlobal,
  btnSendGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';
import {getCategories} from '../utils/getCategories';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MessageThanks} from '../components/MessageThanks';
import {Background} from '../components/Background';
import {Background2} from '../components/Background2';
import Icon from 'react-native-vector-icons/Ionicons';
import {Loading} from './Loading';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../context/authContext/authContext';
import {CarouselImage2} from '../components/CarouselImages2';
import {DB} from '../db/db';
import {getGeneros} from '../utils/getGeneros';

export const AddProduct = () => {
  const {heightWindow, widthWindow} = DeviceDimensions();
  const navigation = useNavigation();
  const [newProduct, setNewProduct] = useState<ResPublishProduct>();
  const [loading, setLoading] = useState(false);
  const {categoria, nombre, precio, descripcion, genero, onChange, form} =
    useForm({
      categoria: '',
      genero: '',
      nombre: '',
      precio: '',
      descripcion: '',
    });
  const [categories, setCategories] = useState<InfoCategoria[] | undefined>();
  const [generos, setGeneros] = useState<Genero[] | undefined>();
  const [isChange, setIsChange] = useState(false);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {addProduct, uploadImage} = useContext(ProductsContext);
  const {user} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const [tempUri, setTempUri] = useState<string>('');

  const [images, setImages] = useState([
    'https://res.cloudinary.com/dlh7zo1xh/image/upload/v1675814470/placeholder_uv7b1n.png',
    'https://res.cloudinary.com/dlh7zo1xh/image/upload/v1675814470/placeholder_uv7b1n.png',
  ]);

  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (categoria.length > 0) {
      getGeneros(categoria).then(data => setGeneros(data));
    }
  }, [categoria]);

  const publishProduct = () => {
    console.log(form);
    console.log(images);
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

  const loadImagesFromCamera = (positionImg: number) => {
    let arrayTemp: string[] = [...images];
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      async res => {
        if (res.didCancel) return;
        arrayTemp[positionImg] = res.assets[0].uri;
        setImages(arrayTemp);
      },
    );
  };

  return (
    <ScrollView>
      <LinearGradient
        style={{
          ...borderRadiusGlobal,
          marginBottom: heightWindow * 0.3,
        }}
        colors={[colors.card, colors.background]}
        start={{x: 0.1, y: 0.1}}
        end={{x: 0.6, y: 0.9}}>
        <View
          style={{
            backgroundColor: colors.primary,
            ...shadowGlobal,
            ...styles.containerInfoProfile,
          }}>
          <Image
            source={{uri: user?.img}}
            style={{
              width: 50,
              ...borderRadiusGlobal,
              height: 50,
              ...marginGlobalHorizontal,
              ...marginGlobalVertical,
            }}
          />
          <Text
            style={{
              ...styles.textNameProfile,
              color: colors.text,
              ...marginGlobalVertical,
            }}>
            ✌Yo✌
          </Text>
        </View>
        <CarouselImage2 images={images} loadImage={loadImagesFromCamera} />
        <KeyboardAvoidingView
          style={{...marginGlobalHorizontal}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput
            style={{
              ...styles.inputs,
              color: colors.text,
              backgroundColor: colors.card,
            }}
            placeholder={`Ingrese el titulo de  la publicación`}
            placeholderTextColor={colors.text}
            autoCapitalize={'words'}
            value={nombre}
            onChangeText={value => onChange(value, 'nombre')}
          />
          <TextInput
            style={{
              ...styles.inputs,
              color: colors.text,
              backgroundColor: colors.card,
            }}
            placeholder={'Ingrese la descripción de la publicación'}
            placeholderTextColor={colors.text}
            value={descripcion}
            onChangeText={value => onChange(value, 'descripcion')}
          />
          {!categories ? (
            <PacmanIndicator color={colors.primary} size={22} />
          ) : (
            <View
              style={{backgroundColor: colors.card, ...marginGlobalVertical}}>
              <Text style={{fontSize: 18, color: colors.text}}>
                Escoje una Categoria:
              </Text>
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
          )}
          {!generos ? (
            <PacmanIndicator color={colors.primary} size={22} />
          ) : (
            <View
              style={{backgroundColor: colors.card, ...marginGlobalVertical}}>
              <Text style={{fontSize: 18, color: colors.text}}>
                Escoje un Genero:
              </Text>
              <Picker
                selectedValue={genero}
                onValueChange={itemValue => onChange(itemValue, 'genero')}>
                {generos?.map(({nombre: nameGen, _id}) => (
                  <Picker.Item
                    color={colors.text}
                    label={nameGen}
                    value={_id}
                    key={_id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <View style={styles.containerInfoProduct}>
            <Switch
              trackColor={{false: colors.card, true: colors.text}}
              thumbColor={isChange ? colors.primary : colors.card}
              onChange={() => setIsChange(!isChange)}
              value={isChange}
            />
            <Text style={{color: colors.text, ...styles.textIsChange}}>
              Deseas hacer intercambio
            </Text>
          </View>
          {!isChange && (
            <TextInput
              style={{
                ...styles.inputs,
                color: colors.text,
                backgroundColor: colors.card,
              }}
              placeholder={'Ingresar el precio'}
              placeholderTextColor={colors.text}
              value={precio}
              keyboardType="number-pad"
              onChangeText={value => onChange(value, 'precio')}
            />
          )}
          <TouchableOpacity
            style={{
              ...btnSendGlobal,
              backgroundColor: colors.primary,
              flexDirection: 'row',
              justifyContent: 'center',
              ...marginGlobalVertical,
            }}
            activeOpacity={0.7}
            onPress={() => publishProduct()}>
            <Icon name="bonfire" size={22} />
            <Text style={{color: colors.text, fontSize: 18}}>
              Subir Publicación
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ScrollView>
  );

  // return (
  //   <ScrollView>
  //     <Background2 />
  //     <View
  //       style={{
  //         backgroundColor: colors.primary,
  //         paddingBottom: 20,
  //         ...borderRadiusGlobal,
  //       }}>
  //       <Text
  //         style={{
  //           marginTop: top,
  //           ...marginGlobalHorizontal,
  //           color: colors.text,
  //           fontSize: 22,
  //           fontWeight: 'bold',
  //         }}>
  //         Nueva Publicación
  //       </Text>
  //     </View>
  //     {!newProduct ? (
  //       <KeyboardAvoidingView
  //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //         style={{flex: 1, ...marginGlobalHorizontal}}>
  //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //           <View style={{flex: 1}}>
  //             {/* <MessageThanks /> */}
  //             <Text
  //               style={{
  //                 color: colors.text,
  //                 fontSize: 22,
  //                 ...marginGlobalVertical,
  //               }}>
  //               Escoja una Categoría
  //             </Text>
  //             <View
  //               style={{
  //                 backgroundColor: colors.card,
  //                 opacity: 0.5,
  //                 ...borderRadiusGlobal,
  //               }}>
  // <Picker
  //   selectedValue={categoria}
  //   onValueChange={itemValue => onChange(itemValue, 'categoria')}>
  //   {categories?.map(({nombre: nombreCat, _id}) => (
  //     <Picker.Item
  //       color={colors.text}
  //       label={nombreCat}
  //       value={_id}
  //       key={_id}
  //     />
  //   ))}
  // </Picker>
  //             </View>
  //             <Text
  //               style={{
  //                 color: colors.text,
  //                 fontSize: 22,
  //                 ...marginGlobalVertical,
  //               }}>
  //               Ingrese el titulo de su publicacion
  //             </Text>
  //             <TextInput
  //               style={{
  //                 ...styles.inputs,
  //                 color: colors.text,
  //                 backgroundColor: colors.card,
  //               }}
  //               placeholder={`...`}
  //               placeholderTextColor={colors.text}
  //               autoCapitalize={'words'}
  //               value={nombre}
  //               onChangeText={value => onChange(value, 'nombre')}
  //             />
  //             <Text
  //               style={{
  //                 color: colors.text,
  //                 fontSize: 22,
  //                 ...marginGlobalVertical,
  //               }}>
  //               Ingrese el precio de su publicacion
  //             </Text>
  // <TextInput
  //   style={{
  //     ...styles.inputs,
  //     color: colors.text,
  //     backgroundColor: colors.card,
  //   }}
  //   placeholder={`...`}
  //   placeholderTextColor={colors.text}
  //   value={precio}
  //   keyboardType="number-pad"
  //   onChangeText={value => onChange(value, 'precio')}
  // />
  // <TouchableOpacity
  //   style={{
  //     ...btnSendGlobal,
  //     backgroundColor: colors.primary,
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //   }}
  //   activeOpacity={0.7}
  //   onPress={() => publishProduct()}>
  //   <Icon name="bonfire" size={22} />
  //   <Text style={{color: colors.text, fontSize: 18}}>
  //     Subir Publicación
  //   </Text>
  // </TouchableOpacity>
  //           </View>
  //         </TouchableWithoutFeedback>
  //       </KeyboardAvoidingView>
  //     ) : (
  //       <>
  //         {loading && <Loading />}
  //         <View style={{alignItems: 'center'}}>
  //           <TouchableOpacity
  //             onPress={() => takePhoto()}
  //             style={{
  //               ...btnSendGlobal,
  //               backgroundColor: colors.primary,
  //               flexDirection: 'row',
  //               justifyContent: 'center',
  //               ...marginGlobalVertical,
  //             }}
  //             activeOpacity={0.5}>
  //             <Icon name="cloud-upload" size={30} color={colors.text} />
  //             <Text style={{color: colors.text, fontSize: 18}}>
  //               Tomar una foto
  //             </Text>
  //           </TouchableOpacity>
  //           {tempUri && (
  //             <Image
  //               source={{uri: tempUri}}
  //               style={{
  //                 marginTop: 10,
  //                 ...borderRadiusGlobal,
  //                 width: widthWindow * 0.6,
  //                 height: heightWindow * 0.2,
  //               }}
  //             />
  //           )}
  //         </View>
  //       </>
  //     )}
  //   </ScrollView>
  // );
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
  containerInfoProfile: {
    flexDirection: 'row',
    opacity: 0.8,
    alignItems: 'center',
    width: '66%',
    borderTopEndRadius: 555,
    borderBottomEndRadius: 333,
  },
  textNameProfile: {
    alignSelf: 'flex-end',
    fontSize: 22,
  },
  containerInfoProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textIsChange: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
