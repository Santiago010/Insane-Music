import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// dev
//http://localhost:8080

export const DB = axios.create({
  baseURL: 'http://192.168.1.19:8080/api',
});

DB.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2I4NWQzODQxMmQ0ZjMxMmE4ZDE0NzAiLCJpYXQiOjE2ODY4NTk3MDEsImV4cCI6MTY4NzQ2NDUwMX0.2jw_FDElLc4Ro97eFM3MkHRFBBiCTKrF7njvKhfVThI';
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});
