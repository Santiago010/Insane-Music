import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/themeContext/themeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const HeaderBar = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        paddingTop: top,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{margin: 10}}>
        <Icon name="arrow-undo" size={30} color={colors.primary} />
      </TouchableOpacity>
      {children}
    </View>
  );
};
