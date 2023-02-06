import React, {useContext, useEffect} from 'react';
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

export const FormRegister = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const {onChange, form, correo, password, nombre} = useForm({
    correo: '',
    password: '',
    nombre: '',
  });

  const sendData = async () => {
    Keyboard.dismiss();
    signUp(form);
  };

  const showError = () => {
    Alert.alert('Error de Registro', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  };

  useEffect(() => {
    if (errorMessage.length < 0) {
      showError();
    }
  }, [errorMessage]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, ...marginGlobalHorizontal}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Logo />
          <Text style={{...styles.title, color: colors.text}}>Registro</Text>

          <Text style={{...styles.labels, color: colors.text}}>Nombre</Text>
          <TextInput
            style={{
              ...styles.inputs,
              color: colors.text,
              backgroundColor: colors.background,
            }}
            placeholder="Ingrese un nombre de usuario..."
            placeholderTextColor={colors.text}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            value={nombre}
            onChangeText={value => onChange(value, 'nombre')}
          />
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
          <TouchableOpacity
            style={{...btnSendGlobal, backgroundColor: colors.primary}}
            activeOpacity={0.7}
            onPress={() => sendData()}>
            <Text
              style={{color: colors.text, fontSize: 18, textAlign: 'center'}}>
              Crear Cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
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
});
