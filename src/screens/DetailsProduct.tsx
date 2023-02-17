import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {Card} from '../components/Card';
import {HeaderBar} from '../components/HeaderBar';
import {ProductsContext} from '../context/productsContext/productsContext';
import {useAnimation} from '../hooks/useAnimation';
import {Producto} from '../interfaces/interfacesApp';
import {RootStackParamsStackProducts} from '../navigator/StackProducts';
import {Loading} from '../screens/Loading';

interface Props
  extends StackScreenProps<RootStackParamsStackProducts, 'Details'> {}

export const DetailsProduct = ({route}: Props) => {
  let {_id} = route.params;
  const {loadProductById} = useContext(ProductsContext);
  const [product, setProduct] = useState<Producto | undefined>();
  const {position, startMovingPosition} = useAnimation();

  useEffect(() => {
    startMovingPosition(-350, 900);
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await loadProductById(_id);
    setProduct(data);
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <ScrollView style={{flex: 1}}>
      <Animated.View
        style={{
          transform: [{translateY: position}],
          flex: 1,
          marginBottom: 222,
        }}>
        <HeaderBar></HeaderBar>
        <Card product={product} typeBtn={'Estoy Interesado'} />
      </Animated.View>
    </ScrollView>
  );
};
