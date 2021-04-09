import React from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/UI/headerButton/HeaderButton';
import OrderItem from '../../../components/shop/orderItem/OrderItem';

const Orders = (props) => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <View style={{ ...props.style, ...styles.screen }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          console.log('itemData', itemData);
          return (
            <OrderItem
              orderId={itemData.item.id}
              items={itemData.item.items}
              totalAmount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
            />
          );
        }}
      ></FlatList>
    </View>
  );
};

Orders.navigationOptions = (navOptions) => {
  return {
    headerTitle: 'Your Orders',
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
  };
};

const styles = StyleSheet.create({
  screen: {},
  text: { color: 'red' },
});

export default Orders;
