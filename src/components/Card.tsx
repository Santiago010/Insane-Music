import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeContext} from '../context/themeContext/themeContext';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
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

interface Props {
  product: Producto;
}

export const Card = ({product}: Props) => {
  const {opacity, fadeIn, fadeOut} = useAnimation();
  const {user} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(product);
    fadeIn(800);
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
            flexDirection: 'row',
            backgroundColor: colors.primary,
            opacity: 0.8,
            alignItems: 'center',
            width: '66%',
            borderTopEndRadius: 555,
            borderBottomEndRadius: 333,
            ...shadowGlobal,
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
                fontSize: 22,
                color: colors.text,
                alignSelf: 'flex-end',
                ...marginGlobalVertical,
              }}>
              ✌Yo✌
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 22,
                color: colors.text,
                alignSelf: 'flex-end',
                ...marginGlobalVertical,
              }}>
              {product.usuario.nombre}
            </Text>
          )}

          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Icon name="leaf" size={18} />
          </View>
        </TouchableOpacity>
        <CarouselImages
          images={[
            product.img,
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
          ]}
        />
        <View style={{...marginGlobalHorizontal}}>
          <Text style={{color: colors.text, fontWeight: 'bold', fontSize: 22}}>
            {product.nombre}
          </Text>
          <Text style={{color: colors.text, fontSize: 18}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.primary,
              ...shadowGlobal,
              ...borderRadiusGlobal,
              alignSelf: 'center',
              ...marginGlobalVertical,
              paddingHorizontal: 22,
              paddingVertical: 10,
            }}
            onPress={() =>
              navigation.navigate('Details', {
                name: product.nombre,
                _id: product._id,
              })
            }>
            <Text style={{color: colors.text, fontSize: 18}}>Ver</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
