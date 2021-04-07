import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Platform } from 'react-native';
import ListItem from '../../../components/shop/listItem/ListItem';
import { addToCart } from '../../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/UI/headerButton/HeaderButton';

const ProductOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

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
        onAddToCart={() => {
          dispatch(addToCart(itemData.item));
        }}
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

ProductOverview.navigationOptions = (navOptions) => {
  return {
    headerTitle: 'Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navOptions.navigation.navigate('Cart');
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductOverview;
