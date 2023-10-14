import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {AuthContext} from '../context/authContext/authContext';
import {ThemeContext} from '../context/themeContext/themeContext';
import {Loading} from '../screens/Loading';
import {Login} from '../screens/Login';
import {Register} from '../screens/Register';
import {BottonTabNavigator} from './BottonTabNavigator';

const AppStack = createStackNavigator();


export const Stack = () => {
  const {theme} = useContext(ThemeContext);
  const {status} = useContext(AuthContext);

  if (status === 'checking') {
    return <Loading />;
  }
  return (
    <NavigationContainer theme={theme}>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        {status !== 'authenticated' ? (
          <>
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <AppStack.Screen name="Protected" component={BottonTabNavigator} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
