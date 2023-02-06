import React, {useContext} from 'react';
import {BarIndicator} from 'react-native-indicators';
import {ThemeContext} from '../context/themeContext/themeContext';

export const Loading = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return <BarIndicator count={4} size={50} color={colors.primary} />;
};
