import React from 'react';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/authContext/authContext';
import {ChatProviver} from './src/context/chatContext/chatContext';
import {ProductsProvider} from './src/context/productsContext/productsContext';
import {ThemeProvider} from './src/context/themeContext/themeContext';
import {Stack} from './src/navigator/Stack';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => (
  <AuthProvider>
    <ThemeProvider>
      <ChatProviver>
        <ProductsProvider>{children}</ProductsProvider>
      </ChatProviver>
    </ThemeProvider>
  </AuthProvider>
);

const App = () => {
  return (
    <AppState>
      <Stack />
    </AppState>
  );
};

export default App;
