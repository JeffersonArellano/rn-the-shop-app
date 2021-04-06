import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ListItem from '../../../components/shop/listItem/ListItem';

const ProductOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const onCartHandler = () => {
    console.log('on cart press');
  };

  const itemList = (itemData) => {
    return (
      <ListItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        onViewDetails={() =>
          props.navigation.navigate('ProductDetail', {
            producId: itemData.item.id,
            productTitle: itemData.item.title,
          })
        }
        onViewCart={onCartHandler}
      />
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={itemList}
      style={{ width: '100%' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

ProductOverview.navigationOptions = {
  headerTitle: 'Products',
};

export default ProductOverview;
