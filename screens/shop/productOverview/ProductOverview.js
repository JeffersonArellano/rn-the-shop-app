import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Platform, Button } from 'react-native';
import ListItem from '../../../components/shop/listItem/ListItem';
import { addToCart } from '../../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/UI/headerButton/HeaderButton';
import Colors from '../../../constants/Colors';

const ProductOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectedItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      producId: id,
      productTitle: title,
    });
  };

  const itemList = (itemData) => {
    return (
      <ListItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        onSelect={() =>
          selectedItemHandler(itemData.item.id, itemData.item.title)
        }
      >
        <Button
          title='Details'
          color={Colors.primary}
          onPress={() =>
            selectedItemHandler(itemData.item.id, itemData.item.title)
          }
        />
        <Button
          title='To Cart'
          color={Colors.primary}
          onPress={() => dispatch(addToCart(itemData.item))}
        />
      </ListItem>
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navOptions.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),

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
