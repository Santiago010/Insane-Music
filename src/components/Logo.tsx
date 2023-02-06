import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {shadowGlobal} from '../theme/GlobalTheme';

export const Logo = () => {
  const {heightWindow, widthWindow} = DeviceDimensions();
  const {top} = useSafeAreaInsets();

  return (
    <View style={{...styles.container, marginTop: top}}>
      <Image
        source={require('../assets/Logo.png')}
        style={{width: widthWindow * 0.6, height: heightWindow * 0.2}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...shadowGlobal,
  },
});
