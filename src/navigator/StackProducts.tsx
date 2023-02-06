import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DetailsProduct} from '../screens/DetailsProduct';
import {Home} from '../screens/Home';

export type RootStackParamsStackProducts = {
  Home: undefined;
  Details: {
    name: string;
    _id: string;
  };
};

const AppStack = createStackNavigator<RootStackParamsStackProducts>();

export const StackProducts = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Details" component={DetailsProduct} />
    </AppStack.Navigator>
  );
};
