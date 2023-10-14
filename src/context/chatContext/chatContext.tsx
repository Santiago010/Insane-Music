import React, {createContext, useEffect, useState} from 'react';
import {DB} from '../../db/db';
import {
  MessageChat,
  UserChat,
  UserChat2,
  Usuario,
} from '../../interfaces/interfacesApp';

interface ChatContextProps {
  userChats: UserChat[] | null;
  loadChatsUser: (uid: string | undefined) => void;
  loadChat: (member1: string, member2: string) => Promise<UserChat | undefined>;
  loadMessages: (_id: string | undefined) => Promise<MessageChat[] | undefined>;
  addMessage: (
    chatId: string,
    senderId: string,
    text: string,
  ) => Promise<MessageChat | undefined>;
  createChat: (
    senderId: string | undefined,
    receiverId: string | undefined,
  ) => Promise<UserChat | undefined>;
  createChat2: (
    usuarioSender: Usuario | null,
    usuarioReceiver: Usuario | null,
  ) => Promise<MessageChat | undefined>;
}

export const ChatContext = createContext({} as ChatContextProps);

export const ChatProviver = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [userChats, setUserChats] = useState<UserChat[] | null>();

  const loadChatsUser = async (uid: string | undefined) => {
    try {
      const {data} = await DB.get<UserChat[]>(`/chats/${uid}`);
      console.log(data);
      setUserChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadChat = async (member1: string, member2: string) => {
    try {
      const {data} = await DB.get<UserChat>(
        `/chats/find/${member1}/${member2}`,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (_id: string | undefined) => {
    try {
      const {data} = await DB.get<MessageChat[]>(`/message/${_id}/`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addMessage = async (chatId: string, senderId: string, text: string) => {
    try {
      const {data} = await DB.post(`/message`, {
        chatId,
        senderId,
        text,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createChat = async (
    senderId: string | undefined,
    receiverId: string | undefined,
  ) => {
    try {
      const {data} = await DB.post<UserChat>(`/chats`, {
        senderId,
        receiverId,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        userChats,
        loadChatsUser,
        loadChat,
        loadMessages,
        addMessage,
        createChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
