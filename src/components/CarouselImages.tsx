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
      width={widthWindow}
      height={heightWindow * 0.3}
      data={images}
      mode={'parallax'}
      modeConfig={{
        parallaxAdjacentItemScale: 0.6,
        parallaxScrollingOffset: 100,
        parallaxScrollingScale: 0.9,
      }}
      scrollAnimationDuration={1000}
      onSnapToItem={index => {
        setNumItem(index + 1);
      }}
      renderItem={({item}) => (
        <View>
          <Image
            source={{uri: item}}
            style={{
              width: '100%',
              height: '100%',
              ...borderRadiusGlobal,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              color: colors.text,
              top: 20,
              left: 20,
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
