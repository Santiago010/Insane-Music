/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddProduct} from '../screens/AddProduct';
import {Profile} from '../screens/Profile';
import {borderRadiusGlobal, shadowGlobal} from '../theme/GlobalTheme';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {Text, View} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../context/themeContext/themeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonAddProduct} from '../components/ButtonAddProduct';
import {StackProducts} from './StackProducts';
import SearchProduct from '../screens/SearchProduct';
import {StackChat} from './StackChat';

const Tab = createBottomTabNavigator();
const {heightWindow} = DeviceDimensions();

export const BottonTabNavigator = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          ...borderRadiusGlobal,
          ...shadowGlobal,
          borderTopWidth: 0,
          height: heightWindow * 0.1,
          opacity: 0.9,
        },
      }}>
      <Tab.Screen
        name="StackProducts"
        component={StackProducts}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="planet"
                size={30}
                color={focused ? colors.primary : colors.text}
              />
              <Text style={{color: focused ? colors.primary : colors.text}}>
                Inicio
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="search"
                size={30}
                color={focused ? colors.primary : colors.text}
              />
              <Text style={{color: focused ? colors.primary : colors.text}}>
                Buscar
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarIcon: ({}) => <Icon name="add" size={50} color={colors.text} />,
          tabBarButton: props => <ButtonAddProduct {...props} />,
        }}
      />
      <Tab.Screen
        name="StackChat"
        component={StackChat}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="chatbubble-ellipses"
                size={30}
                color={focused ? colors.primary : colors.text}
              />
              <Text style={{color: focused ? colors.primary : colors.text}}>
                Mensajes
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="person-circle"
                size={30}
                color={focused ? colors.primary : colors.text}
              />
              <Text style={{color: focused ? colors.primary : colors.text}}>
                Perfil
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
