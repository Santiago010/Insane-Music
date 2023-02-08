import React, {useContext, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/themeContext/themeContext';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {borderRadiusGlobal} from '../theme/GlobalTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  images: string[];
  loadImage: (positionImg: number) => void;
}

export const CarouselImage2 = ({images, loadImage}: Props) => {
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => loadImage(numItem - 1)}
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              backgroundColor: colors.primary,
              ...borderRadiusGlobal,
              opacity: 0.8,
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 22,
                fontWeight: 'bold',
                marginRight: 5,
              }}>
              {numItem === 1 ? 'Subir Portada' : 'Subir Contraportada'}
            </Text>
            <Icon name="cloud-upload" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
