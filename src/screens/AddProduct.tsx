import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductsContext} from '../context/productsContext/productsContext';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useForm} from '../hooks/useForm';
import {PacmanIndicator} from 'react-native-indicators';
import {
  borderRadiusGlobal,
  bottonTabNavigatorStyleGlobal,
  btnSendGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../context/authContext/authContext';
import {CarouselImage2} from '../components/CarouselImages2';
import {arrayPlaceholderImgsProducts} from '../utils/arrayPlaceholderImgsProducts';
import {useCategories} from '../hooks/useCategories';
import {useGeneros} from '../hooks/useGeneros';

export const AddProduct = () => {
  const {heightWindow} = DeviceDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {categoria, nombre, precio, descripcion, genero, onChange, clear} =
    useForm({
      categoria: '',
      genero: '',
      nombre: '',
      precio: '',
      descripcion: '',
    });
  const {categories} = useCategories();
  const {generos, getGeneros} = useGeneros();
  const [isChange, setIsChange] = useState(false);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {addProduct, uploadImage} = useContext(ProductsContext);
  const {user} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();

  const [images, setImages] = useState<ImagePickerResponse[]>(
    arrayPlaceholderImgsProducts,
  );

  const clearSpace = () => {
    setImages(arrayPlaceholderImgsProducts);
    clear();
    setIsChange(false);
  };

  const publishProduct = () => {
    if (
      images[0].assets[0].uri?.includes('cloudinary') ||
      images[1].assets[0].uri?.includes('cloudinary')
    ) {
      Alert.alert('¡Atención', 'Te falta alguna foto por subir', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else {
      setLoading(true);
      addProduct(categoria, descripcion, genero, nombre, precio, isChange).then(
        data => {
          uploadImage(images, data?._id).then(re => {
            setLoading(false);
            clearSpace();
            Alert.alert(
              `${data?.nombre} publicado`,
              '✌ Gracias por aportar un granito para atender la inevitable perplejidad de la realidad ✌',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('StackProducts'),
                },
              ],
            );
          });
        },
      );
    }
  };

  const loadImagesFromCamera = (positionImg: number) => {
    let arrayTemp: ImagePickerResponse[] = [...images];
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      async res => {
        if (res.didCancel) return;
        arrayTemp[positionImg] = res;
        setImages(arrayTemp);
      },
    );
  };

  const loadImageFromGallery = (positionImg: number) => {
    let arraytemp: ImagePickerResponse[] = [...images];
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        arraytemp[positionImg] = resp;
        setImages(arraytemp);
      },
    );
  };

  const showAlertUploadPhoto = (positionImg: number) => {
    let typePhoto = positionImg === 0 ? 'Portada' : 'Contraportada';
    Alert.alert(
      typePhoto,
      `Sube una foto linda de la ${typePhoto.toLowerCase()}`,
      [
        {
          text: 'Abrir Galería',
          onPress: () => loadImageFromGallery(positionImg),
        },
        {
          text: 'Tomar Una Foto',
          onPress: () => loadImagesFromCamera(positionImg),
        },
      ],
    );
  };

  useEffect(() => {
    let keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        navigation.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      },
    );

    let keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        navigation.setOptions({
          tabBarStyle: {
            ...bottonTabNavigatorStyleGlobal,
            height: heightWindow * 0.1,
          },
        });
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
    <ScrollView style={{paddingTop: top}}>
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
            ¡Nueva Publicación!
          </Text>
        </View>
        <CarouselImage2 images={images} loadImage={showAlertUploadPhoto} />
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

          <View
            style={{
              backgroundColor: colors.card,
              ...marginGlobalVertical,
            }}>
            <Text style={{fontSize: 18, color: colors.text}}>
              Escoje una categoria:
            </Text>
            {categories ? (
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
            ) : (
              <PacmanIndicator color={colors.primary} size={22} />
            )}
          </View>
          <View
            style={{
              backgroundColor: colors.card,
              ...marginGlobalVertical,
            }}>
            <Text style={{fontSize: 18, color: colors.text}}>
              Escoje un genero:
            </Text>
            {generos ? (
              <Picker
                selectedValue={genero}
                onValueChange={itemValue => onChange(itemValue, 'genero')}>
                {generos?.map(({nombre: nameGe, _id}) => (
                  <Picker.Item
                    color={colors.text}
                    label={nameGe}
                    value={_id}
                    key={_id}
                  />
                ))}
              </Picker>
            ) : (
              <PacmanIndicator color={colors.primary} size={22} />
            )}
          </View>

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
          {loading && <PacmanIndicator color={colors.primary} size={44} />}
        </KeyboardAvoidingView>
      </LinearGradient>
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
    fontSize: 18,
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
