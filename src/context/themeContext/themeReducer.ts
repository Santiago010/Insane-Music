import {Theme} from '@react-navigation/native';

type ThemeAction = {type: 'set_light_theme'} | {type: 'set_dark_theme'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#678983',
    background: '#F8F4EA',
    card: '#E6DDC4',
    text: '#181D31',
    border: '#181D31',
    notification: '#678983',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  colors: {
    primary: '#678983',
    background: '#181D31',
    card: '#111922',
    text: '#F8F4EA',
    border: '#F8F4EA',
    notification: '#678983',
  },
};

export const themeReducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightTheme};
    case 'set_dark_theme':
      return {...darkTheme};
    default:
      return state;
  }
};
