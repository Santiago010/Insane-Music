import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import {CarouselImages} from '../components/CarouselImages';
import {HeaderBar} from '../components/HeaderBar';
import {AuthContext} from '../context/authContext/authContext';
import {ChatContext} from '../context/chatContext/chatContext';
import {ProductsContext} from '../context/productsContext/productsContext';
import {ThemeContext} from '../context/themeContext/themeContext';
import {useAnimation} from '../hooks/useAnimation';
import {Producto} from '../interfaces/interfacesApp';
import {RootStackParamsStackProducts} from '../navigator/StackProducts';
import {Loading} from '../screens/Loading';
import {
  borderRadiusGlobal,
  marginGlobalVertical,
  shadowGlobal,
} from '../theme/GlobalTheme';

interface Props
  extends StackScreenProps<RootStackParamsStackProducts, 'Details'> {}

export const DetailsProduct = ({navigation, route}: Props) => {
  let {name, _id} = route.params;
  const {loadProductById} = useContext(ProductsContext);
  const {createChat} = useContext(ChatContext);
  const {user} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [product, setProduct] = useState<Producto | null>(null);
  const {position, startMovingPosition} = useAnimation();

  useEffect(() => {
    startMovingPosition(-350, 900);
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await loadProductById(_id);
    console.log(data);
    setProduct(data);
  };

  const createChatForSendMessage = () => {
    createChat(user?.uid, product?.usuario._id).then(data => {
      navigation.navigate('StackChat');
    });
  };

  return (
    <Animated.View style={{transform: [{translateY: position}], flex: 1}}>
      <HeaderBar>
        {
          <Text style={{color: colors.text, fontSize: 22, fontWeight: 'bold'}}>
            {name}
          </Text>
        }
      </HeaderBar>

      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <Image source={require('../assets/avatar.png')} />
        <Text
          style={{
            fontSize: 18,
            color: colors.text,
          }}>
          {product?.usuario.nombre}
        </Text>
      </TouchableOpacity>

      {!product ? (
        <Loading />
      ) : (
        <View>
          <CarouselImages
            images={[
              product.img,
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',
            ]}
          />
          <Text style={{color: colors.text, fontSize: 18}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
            }}>
            Categoria : {product.categoria.nombre}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: colors.text,
            }}>
            Precio : {product.precio}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.primary,
              ...shadowGlobal,
              ...borderRadiusGlobal,
              alignSelf: 'center',
              ...marginGlobalVertical,
              paddingHorizontal: 22,
              paddingVertical: 10,
            }}
            onPress={() => createChatForSendMessage()}>
            <Text style={{color: colors.text, fontSize: 18}}>
              Estoy Interesado
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
