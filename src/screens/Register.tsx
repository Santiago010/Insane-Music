import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {Background} from '../components/Background';
import {FormRegister} from '../components/FormRegister';
import {useAnimation} from '../hooks/useAnimation';

export const Register = () => {
  const {position, startMovingPosition} = useAnimation();

  useEffect(() => {
    startMovingPosition(-350, 900);
  }, []);
  return (
    <Animated.View style={{transform: [{translateY: position}], flex: 1}}>
      <Background />
      <FormRegister />
    </Animated.View>
  );
};
