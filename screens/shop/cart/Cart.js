import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../store/actions/cart';
import { addOrder } from '../../../store/actions/order';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import CartItem from '../../../components/shop/cartItem/CartItem';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Cart = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];

    for (let key in state.cart.items) {
      const productImage = products.find((prod) => prod.id === key);

      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        imageUrl: productImage.imageUrl,
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  if (cartItems.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name='cart-remove'
          size={100}
          color={Colors.primary}
        />
        <Text style={styles.emptyList}>
          There's not products added, start adding some Items{' '}
          <FontAwesome5 name='smile-wink' size={24} color='black' />
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.totalAmount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          style={styles.buttonOrder}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, totalAmount));
          }}
        />
      </View>
      <View style={{ ...props.style, ...styles.screen }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              imageUrl={itemData.item.imageUrl}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              quantity={itemData.item.quantity}
              onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
              deletable
            />
          )}
        ></FlatList>
      </View>
    </View>
  );
};

Cart.navigationOption = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  totalAmount: {
    color: Colors.primary,
  },
  buttonOrder: {},
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyList: {
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 20,
  },
});

export default Cart;
