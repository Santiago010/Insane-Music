import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {shadowGlobal} from '../theme/GlobalTheme';
import {DeviceDimensions} from '../helpers/DeviceDimensions';

const {heightWindow, widthWindow} = DeviceDimensions();

export const Background = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.card,
        width: widthWindow * 2,
        height: heightWindow,
        top: -heightWindow * 0.3,
        shadowColor: colors.text,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    transform: [{rotate: '-70deg'}],
    ...shadowGlobal,
  },
});
