import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {Chat} from '../screens/Chat';
import {Chats} from '../screens/Chats';
import {createStackNavigator} from '@react-navigation/stack';
import {UserChat} from '../interfaces/interfacesApp';

export type RootStackParamsStackChat = {
  Chats: undefined;
  Chat: {
    chat: UserChat;
  };
};

interface Props
  extends BottomTabScreenProps<RootStackParamsStackChat, 'Chat'> {}

const AppStack = createStackNavigator<RootStackParamsStackChat>();

export const StackChat = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, []);

  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Chats" component={Chats} />
      <AppStack.Screen name="Chat" component={Chat} />
    </AppStack.Navigator>
  );
};
