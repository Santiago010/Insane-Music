import React, {useContext, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Card} from '../components/Card';
import {ProductsContext} from '../context/productsContext/productsContext';
import {DeviceDimensions} from '../helpers/DeviceDimensions';
import {marginGlobalVertical} from '../theme/GlobalTheme';

export const Home = () => {
  const {widthWindow, heightWindow} = DeviceDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const {products, loadProducts} = useContext(ProductsContext);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              height: 22,
              width: widthWindow,
            }}
          />
        }
        ListFooterComponent={
          <View
            style={{
              height: 188,
              width: widthWindow,
            }}
          />
        }
        data={products}
        keyExtractor={({_id}) => _id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: heightWindow * 0.1,
              width: widthWindow,
            }}
          />
        )}
        renderItem={({item}) => <Card product={item} typeBtn={'Ver'} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadProducts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...marginGlobalVertical,
  },
});
