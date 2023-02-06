import React, {useContext, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import {color} from 'react-native-reanimated';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useAnimation} from '../hooks/useAnimation';

export const MessageThanks = () => {
  const {opacity, fadeIn} = useAnimation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  useEffect(() => {
    fadeIn(2000, 0.8);
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacity,
      }}>
      <Text
        style={{
          fontSize: 22,
          textAlign: 'center',
          color: colors.text,
        }}>
        ✌ Gracias por aportar un granito para atender la inevitable perplejidad
        de la realidad ✌
      </Text>
    </Animated.View>
  );
};
