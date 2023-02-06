import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../context/themeContext/themeContext';
import {shadowGlobal} from '../theme/GlobalTheme';
import {DeviceDimensions} from '../helpers/DeviceDimensions';

interface NewFigure {
  index: number;
  top: number;
  left: number;
}
const {heightWindow, widthWindow} = DeviceDimensions();

export const Background2 = () => {
  const [figures, setFigures] = useState<NewFigure[]>([]);

  function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateFigures = () => {
    let figuresTemp = [];
    for (let index = 0; index < 5; index++) {
      let newFigure = {
        index,
        top: generateRandomIntegerInRange(0.1, heightWindow),
        left: generateRandomIntegerInRange(0.1, widthWindow),
      };
      figuresTemp.push(newFigure);
    }
    setFigures(figuresTemp);
  };
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  useEffect(() => {
    generateFigures();
    console.log(generateRandomIntegerInRange(0.1, 2));
  }, []);

  console.log(figures);

  return (
    <View style={{...styles.container}}>
      {figures.map(({index, left, top}) => (
        <View
          key={index}
          style={{
            ...styles.container,
            backgroundColor: colors.primary,
            opacity: 0.2,
            width: 100,
            height: 100,
            borderTopEndRadius: 555,
            borderBottomEndRadius: 333,
            borderTopStartRadius: 333,
            borderBottomStartRadius: 555,
            shadowColor: colors.border,
            top,
            left,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
