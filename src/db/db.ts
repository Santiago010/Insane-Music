import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// dev
//http://localhost:8080

export const DB = axios.create({
  baseURL: 'https://backend-insane-music-production.up.railway.app/api',
});

DB.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});
