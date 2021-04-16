import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../store/actions/cart";
import { addOrder } from "../../../store/actions/order";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../../../constants/Colors";
import CartItem from "../../../components/shop/cartItem/CartItem";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../../../components/UI/card/Card";
import { useCallback } from "react";

const Cart = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const products = useSelector((state) => state.products.availableProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const sendOrderHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      await dispatch(addOrder(cartItems, totalAmount));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  if (cartItems.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="cart-remove"
          size={100}
          color={Colors.primary}
        />
        <Text style={styles.emptyList}>
          There's not products added, start adding some Items{" "}
          <FontAwesome5 name="smile-wink" size={24} color="black" />
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.totalAmount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            style={styles.buttonOrder}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
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
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  totalAmount: {
    color: Colors.primary,
  },
  buttonOrder: {},
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyList: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Cart;
