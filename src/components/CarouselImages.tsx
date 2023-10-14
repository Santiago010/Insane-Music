import React, {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/themeContext/themeContext';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {borderRadiusGlobal} from '../theme/GlobalTheme';

interface Props {
  images: string[];
}

export const CarouselImages = ({images}: Props) => {
  const {widthWindow, heightWindow} = DeviceDimensions();
  const [numItem, setNumItem] = useState(1);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Carousel
      style={{
        alignSelf: 'center',
      }}
      width={widthWindow * 0.8}
      height={heightWindow * 0.5}
      data={images}
      mode={'parallax'}
      modeConfig={{
        parallaxAdjacentItemScale: 0.8,
        parallaxScrollingOffset: 80,
        parallaxScrollingScale: 1,
      }}
      scrollAnimationDuration={550}
      onSnapToItem={index => {
        setNumItem(index + 1);
      }}
      renderItem={({item}) => (
        <View
          style={{
            marginLeft: widthWindow * 0.1,
          }}>
          <Image
            source={{uri: item}}
            style={{
              width: '100%',
              height: '100%',
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 6,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              color: colors.text,
              top: 20,
              right: 11,
              backgroundColor: colors.background,
              padding: 2,
              ...borderRadiusGlobal,
            }}>
            {numItem} de 2
          </Text>
        </View>
      )}
    />
  );
};
