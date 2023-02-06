import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthContext} from '../context/authContext/authContext';
import {ChatContext} from '../context/chatContext/chatContext';
import {marginGlobalHorizontal} from '../theme/GlobalTheme';
import {socket} from '../utils/sockets';
import {Loading} from './Loading';
import {ThemeContext} from '../context/themeContext/themeContext';
import {HeaderBar} from '../components/HeaderBar';

export const Chats = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const {userChats, loadChatsUser} = useContext(ChatContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [userConnected, setUserConnected] = useState([]);
  const {top} = useSafeAreaInsets();

  const addUserAndReceiveAllUser = () => {
    socket.emit('addUser', user?.uid);
    socket.on('allUsers', users => setUserConnected(users));
  };

  useEffect(() => {
    loadChatsUser(user?.uid);
    addUserAndReceiveAllUser();
  }, []);

  if (userChats.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userChats}
        ListHeaderComponent={<HeaderBar />}
        keyExtractor={({_id}) => _id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{...marginGlobalHorizontal}}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Chat', {
                chat: item,
              })
            }>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}>
              {item._id}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
