import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {shadowGlobal} from '../theme/GlobalTheme';

export const ButtonAddProduct = ({children, onPress}: any) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <View
        style={{
          ...styles.containerChildren,
          backgroundColor: colors.primary,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowGlobal,
  },
  containerChildren: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
