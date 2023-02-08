import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {AuthContext} from '../context/authContext/authContext';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useForm} from '../hooks/useForm';
import {
  borderRadiusGlobal,
  btnSendGlobal,
  marginGlobalHorizontal,
  marginGlobalVertical,
} from '../theme/GlobalTheme';
import {Logo} from './Logo';

export const FormLogin = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const {onChange, form, correo, password} = useForm({
    correo: '',
    password: '',
  });
  const navigation = useNavigation();

  const sendData = () => {
    Keyboard.dismiss();
    signIn(form);
  };

  const showError = () => {
    Alert.alert('Error al Ingresar', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  };

  useEffect(() => {
    if (errorMessage.length > 0) {
      showError();
    }
  }, [errorMessage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, ...marginGlobalHorizontal}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Logo />
          <Text style={{...styles.title, color: colors.text}}>Login</Text>
          <Text style={{...styles.labels, color: colors.text}}>Correo</Text>
          <TextInput
            style={{
              ...styles.inputs,
              color: colors.text,
              backgroundColor: colors.background,
            }}
            placeholder="Ingrese su correo..."
            placeholderTextColor={colors.text}
            keyboardType="email-address"
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            value={correo}
            onChangeText={value => onChange(value, 'correo')}
          />
          <Text style={{...styles.labels, color: colors.text}}>Contraseña</Text>
          <TextInput
            style={{
              ...styles.inputs,
              color: colors.text,
              backgroundColor: colors.background,
            }}
            placeholder="Ingrese su contraseña..."
            placeholderTextColor={colors.text}
            secureTextEntry={true}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={value => onChange(value, 'password')}
          />
          <View style={styles.containerBtns}>
            <TouchableOpacity
              style={{...btnSendGlobal, backgroundColor: colors.primary}}
              activeOpacity={0.7}
              onPress={() => sendData()}>
              <Text style={{color: colors.text, ...styles.textBtns}}>
                Ingresar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: colors.text, ...styles.textBtns}}>
                Crear Cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labels: {
    fontSize: 22,
  },
  inputs: {
    opacity: 0.3,
    fontSize: 20,
    paddingVertical: 13,
    ...borderRadiusGlobal,
    ...marginGlobalVertical,
    paddingHorizontal: 5,
  },
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textBtns: {
    fontSize: 18,
  },
});
