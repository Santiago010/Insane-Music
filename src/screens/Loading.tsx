import React, {useContext, useEffect, useState} from 'react';
import {BarIndicator} from 'react-native-indicators';
import {ThemeContext} from '../context/themeContext/themeContext';
import {View, useColorScheme} from 'react-native';

export const Loading = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const [background, setBackground] = useState('#F8F4EA');

  useEffect(() => {
    if (colorScheme === 'light') {
      setBackground('#F8F4EA');
    } else {
      setBackground('#181D31');
    }
  }, [colorScheme]);
  return (
    <View
      style={{
        backgroundColor: background,
        flex: 1,
      }}>
      <BarIndicator count={4} size={50} color={colors.primary} />
    </View>
  );
};
