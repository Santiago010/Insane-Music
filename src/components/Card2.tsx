import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {ResProductsForGender} from '../interfaces/interfacesApp';
import {
  borderRadiusGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';

interface Props {
  item: ResProductsForGender;
}

export const Card2 = ({item}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {heightWindow, widthWindow} = DeviceDimensions();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('Details', {
          name: item.nombre,
          _id: item._id,
        })
      }
      style={{
        height: 333,
        width: widthWindow * 0.4,
        ...borderRadiusGlobal,
        ...shadowGlobal,
        backgroundColor: colors.card,
        ...marginGlobalHorizontal,
        ...marginGlobalVertical,
      }}>
      <Image
        source={{uri: item.imgs[0]}}
        style={{
          width: '100%',
          height: '70%',
          ...borderRadiusGlobal,
        }}
      />
      <Text style={{...styles.title, color: colors.text}}>{item.nombre}</Text>
      {item.cambio ? (
        <Text
          style={{
            color: colors.text,
            ...styles.title,
            position: 'absolute',
            marginLeft: 10,
            bottom: 5,
          }}>
          Intercambio
        </Text>
      ) : (
        <Text
          style={{
            color: colors.text,
            ...styles.title,
            position: 'absolute',
            marginLeft: 10,
            bottom: 5,
          }}>
          ${item.precio}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
