import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {Background} from '../components/Background';
import {FormLogin} from '../components/FormLogin';
import {useAnimation} from '../hooks/useAnimation';

export const Login = () => {
  const {position, startMovingPosition} = useAnimation();

  useEffect(() => {
    startMovingPosition(-350, 900);
  }, []);

  return (
    <Animated.View style={{transform: [{translateY: position}], flex: 1}}>
      <Background />
      <FormLogin />
    </Animated.View>
  );
};
