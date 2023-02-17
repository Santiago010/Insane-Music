import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useAnimation} from '../hooks/useAnimation';
import {Producto} from '../interfaces/interfacesApp';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  borderRadiusGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';
import {CarouselImages} from './CarouselImages';
import {AuthContext} from '../context/authContext/authContext';
import {ChatContext} from '../context/chatContext/chatContext';

interface Props {
  product: Producto;
  typeBtn: 'Ver' | 'Estoy Interesado';
}

export const Card = ({product, typeBtn}: Props) => {
  const {opacity, fadeIn, fadeOut} = useAnimation();
  const {user} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();
  const {createChat} = useContext(ChatContext);

  const createChatForSendMessage = () => {
    createChat(user?.uid, product?.usuario._id).then(data => {
      navigation.navigate('StackChat');
    });
  };

  useEffect(() => {
    fadeIn(1111);
    return () => fadeOut();
  }, []);

  return (
    <Animated.View style={{opacity: opacity}}>
      <LinearGradient
        style={{
          ...borderRadiusGlobal,
        }}
        colors={[colors.card, colors.background]}
        start={{x: 0.1, y: 0.1}}
        end={{x: 0.6, y: 0.9}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
          activeOpacity={0.5}
          style={{
            backgroundColor: colors.primary,
            ...shadowGlobal,
            ...styles.btnGoProfile,
            marginBottom: 22,
          }}>
          {product.usuario.img ? (
            <Image
              source={{uri: product.usuario.img}}
              style={{
                width: 50,
                ...borderRadiusGlobal,
                height: 50,
                ...marginGlobalHorizontal,
                ...marginGlobalVertical,
              }}
            />
          ) : (
            <Icon
              name="person-circle"
              style={{
                ...marginGlobalHorizontal,
                ...marginGlobalVertical,
              }}
              size={44}
            />
          )}
          {user?.nombre === product.usuario.nombre ? (
            <Text
              style={{
                ...styles.textBtnGoProfile,
                color: colors.text,
                ...marginGlobalVertical,
              }}>
              ✌Yo✌
            </Text>
          ) : (
            <Text
              style={{
                ...styles.textBtnGoProfile,
                color: colors.text,
                ...marginGlobalVertical,
              }}>
              {product.usuario.nombre}
            </Text>
          )}

          <View style={styles.containerIconBtnGoProfile}>
            <Icon name="chevron-forward" size={30} />
          </View>
        </TouchableOpacity>

        <CarouselImages images={product.imgs} />
        <View style={{...marginGlobalHorizontal}}>
          <Text style={{color: colors.text, ...styles.titleProduct}}>
            {product.nombre}
          </Text>
          <Text style={{color: colors.text, ...styles.description}}>
            {product.descripcion}
          </Text>
          <View
            style={{
              ...styles.containerInfoProduct,
              ...marginGlobalVertical,
            }}>
            <Text
              style={{
                color: colors.text,
                ...styles.textCategorie,
              }}>
              Categoria: {product.categoria.nombre}
              {`\nGenero: ${product.genero.nombre}`}
            </Text>
            {product.cambio ? (
              <Text
                style={{
                  color: colors.text,
                  ...styles.textCategorie,
                }}>
                Intercambio
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.text,
                  ...styles.textCategorie,
                }}>
                ${product.precio}
              </Text>
            )}
          </View>
          {typeBtn === 'Ver' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.primary,
                ...shadowGlobal,
                ...borderRadiusGlobal,
                ...marginGlobalVertical,
                ...styles.btnAction,
              }}
              onPress={() =>
                navigation.navigate('Details', {
                  name: product.nombre,
                  _id: product._id,
                })
              }>
              <Text style={{color: colors.text, ...styles.textBtnActions}}>
                {typeBtn}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.primary,
                ...shadowGlobal,
                ...borderRadiusGlobal,
                ...marginGlobalVertical,
                ...styles.btnAction,
              }}
              onPress={() => createChatForSendMessage()}>
              <Text style={{color: colors.text, ...styles.textBtnActions}}>
                {typeBtn}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  btnGoProfile: {
    flexDirection: 'row',
    opacity: 0.8,
    alignItems: 'center',
    width: '66%',
    borderTopEndRadius: 555,
    borderBottomEndRadius: 333,
  },
  textBtnGoProfile: {
    alignSelf: 'flex-end',
    fontSize: 22,
  },
  containerIconBtnGoProfile: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleProduct: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  containerInfoProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCategorie: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  btnAction: {
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  textBtnActions: {
    fontSize: 18,
  },
});
