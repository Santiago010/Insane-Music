import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {InfoCategoria, Genero} from '../interfaces/interfacesApp';
import {
  borderRadiusGlobal,
  btnSendGlobal,
  marginGlobalVertical,
} from '../theme/GlobalTheme';
import {PacmanIndicator} from 'react-native-indicators';

interface Props {
  visible: boolean;
  hideModal: () => void;
  categories: InfoCategoria[] | undefined;
  generos: Genero[] | undefined;
  categoria: string;
  genero: string;
  setCategoria: (value: string) => void;
  setGenero: (value: string) => void;
  filtrar: () => void;
}

export const ModalFilter = ({
  visible = false,
  hideModal,
  categories,
  genero,
  generos,
  categoria,
  setCategoria,
  setGenero,
  filtrar,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => hideModal()}>
      <View
        style={{
          backgroundColor: colors.card,
          opacity: 0.8,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View
            style={{
              backgroundColor: colors.card,
              ...marginGlobalVertical,
            }}>
            <Text style={{fontSize: 18, color: colors.text}}>
              Escoje una categoria :
            </Text>
            {categories ? (
              <Picker
                selectedValue={categoria}
                onValueChange={itemValue => setCategoria(itemValue)}>
                {categories?.map(({nombre: nombreCat, _id}) => (
                  <Picker.Item
                    color={colors.text}
                    label={nombreCat}
                    value={_id}
                    key={_id}
                  />
                ))}
              </Picker>
            ) : (
              <PacmanIndicator color={colors.primary} size={22} />
            )}
          </View>
          <View
            style={{
              backgroundColor: colors.card,
              ...marginGlobalVertical,
            }}>
            <Text style={{fontSize: 18, color: colors.text}}>
              Escoje un genero:
            </Text>
            {generos ? (
              <Picker
                selectedValue={genero}
                onValueChange={itemValue => setGenero(itemValue)}>
                {generos?.map(({nombre: nameGe, _id}) => (
                  <Picker.Item
                    color={colors.text}
                    label={nameGe}
                    value={_id}
                    key={_id}
                  />
                ))}
              </Picker>
            ) : (
              <PacmanIndicator color={colors.primary} size={22} />
            )}
          </View>
        </View>
        <View style={styles.containerBtns}>
          <TouchableOpacity onPress={() => filtrar()}>
            <Text style={{}}>Filtrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => hideModal()}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerBtns: {
    flexDirection: 'row',
  },
});
