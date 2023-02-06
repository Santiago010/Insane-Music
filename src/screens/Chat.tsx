import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../context/authContext/authContext';
import {ChatContext} from '../context/chatContext/chatContext';
import {MessageChat, UserChat} from '../interfaces/interfacesApp';
import {RootStackParamsStackChat} from '../navigator/StackChat';
import {useForm} from '../hooks/useForm';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/themeContext/themeContext';
import {
  borderRadiusGlobal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';
import {socket} from '../utils/sockets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParamsStackChat, 'Chat'> {}

export const Chat = ({route, navigation}: Props) => {
  let {chat} = route.params;
  const {user} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const {loadChat, loadMessages, addMessage} = useContext(ChatContext);
  const [infoMessage, setInfoMessage] = useState({});
  const [receiveMessage, setReceiveMessage] = useState<any>({}); //TODO: CAMBIAR ANY
  const [messages, setMessages] = useState<MessageChat[] | undefined>([]);
  const {message, onChange} = useForm({
    message: '',
  });
  const refChat = useRef<UserChat>();

  const loadChatAndItsMessage = async () => {
    const resChat = await loadChat(chat.members[0], chat.members[1]);
    refChat.current = resChat;
    const resMessages = await loadMessages(resChat?._id);
    setMessages(resMessages);
  };

  const sendMessage = async () => {
    if (message.length === 0) {
      return;
    } else {
      const newMessage = await addMessage(
        refChat.current?._id,
        user?.uid,
        message,
      );
      setMessages([...messages, newMessage]);
      onChange('', 'message');

      let receiverId = chat.members.find(id => id !== user?.uid);

      console.log(receiverId);
      setInfoMessage({...newMessage, receiverId});
    }
  };

  useEffect(() => {
    if (Object.entries(infoMessage).length !== 0) {
      socket.emit('sendMessage', infoMessage);
    }
  }, [infoMessage]);

  useEffect(() => {
    socket.on('receiveMessage', data => {
      console.log(data);
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    if (
      Object.entries(receiveMessage).length !== 0 &&
      receiveMessage.chatId === chat._id
    ) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    loadChatAndItsMessage();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.card,
          flexDirection: 'row',
          paddingTop: top,
          justifyContent: 'space-between',
          ...shadowGlobal,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-undo" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={{color: colors.text, fontSize: 22}}>{chat._id}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={({createdAt}) => createdAt}
        renderItem={({item}) => (
          <View
            style={
              user?.uid === item.senderId
                ? styles.containerMeMessage
                : styles.containerOtherMessage
            }>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.card,
            flexDirection: 'row',
            paddingHorizontal: 5,
            justifyContent: 'space-between',
            ...shadowGlobal,
            width: '95%',
            ...borderRadiusGlobal,
          }}>
          <TextInput
            onChangeText={value => onChange(value, 'message')}
            value={message}
            placeholder="Mensaje..."
            autoCorrect
            style={{
              ...styles.inputs,
              color: colors.text,
            }}
            autoCapitalize="sentences"
          />
          {message.length > 1 && (
            <TouchableOpacity
              onPress={() => sendMessage()}
              style={{
                backgroundColor: colors.primary,
                ...borderRadiusGlobal,
                ...shadowGlobal,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                ...marginGlobalVertical,
              }}
              activeOpacity={0.8}>
              <Icon name="send" size={30} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputs: {
    opacity: 0.3,
    fontSize: 18,
    paddingVertical: 13,
    ...borderRadiusGlobal,
    ...marginGlobalVertical,
    paddingHorizontal: 5,
  },
  containerMeMessage: {
    backgroundColor: '#85a19c',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    alignSelf: 'flex-end',
    padding: 12,
    ...marginGlobalVertical,
  },
  containerOtherMessage: {
    ...marginGlobalVertical,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: '#d1dcda',
    padding: 12,
    alignSelf: 'flex-start',
  },
});
