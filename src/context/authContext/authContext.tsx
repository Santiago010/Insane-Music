import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useReducer} from 'react';
import {DB} from '../../db/db';
import {
  ResLogin,
  SignInData,
  SignUpData,
  Usuario,
} from '../../interfaces/interfacesApp';
import {authReducer, AuthState} from './authReducer';

interface AuthContextProps {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (data: SignUpData) => void;
  signIn: (data: SignInData) => void;
  logout: () => void;
  removeError: () => void;
}

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem('token');

    if (!token) {
      return dispatch({
        type: 'notAuthenticated',
      });
    } else {
      const res = await DB.get<ResLogin>('/auth');
      if (res.status !== 200) {
        return dispatch({
          type: 'notAuthenticated',
        });
      } else {
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({
          type: 'signUp',
          payload: {
            token: res.data.token,
            user: res.data.usuario,
          },
        });
      }
    }
  };

  const signUp = async ({correo, nombre, password}: SignUpData) => {
    try {
      const {data} = await DB.post<ResLogin>('/usuarios', {
        correo,
        password,
        nombre,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };

  const signIn = async ({correo, password}: SignInData) => {
    try {
      const {data} = await DB.post<ResLogin>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };

  const logout = () => dispatch({type: 'logout'});

  const removeError = () => dispatch({type: 'removeError'});

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{...state, signIn, signUp, logout, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
