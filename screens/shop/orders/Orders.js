import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/headerButton/HeaderButton";
import OrderItem from "../../../components/shop/orderItem/OrderItem";
import { getOrders } from "../../../store/actions/order";
import Colors from "../../../constants/Colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const Orders = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(async () => {
    setIsLoading(true);
    try {
      await dispatch(getOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const orders = useSelector((state) => state.order.orders);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (orders.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5 name="box-open" size={100} color={Colors.primary} />
        <Text style={styles.emptyList}>
          There's not orders created, take a look around and add some orders
          <FontAwesome5 name="smile-wink" size={24} color="black" />
        </Text>
      </View>
    );
  }

  return (
    <View style={{ ...props.style, ...styles.screen }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
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
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
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
  text: { color: "red" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyList: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
  },
});

export default Orders;
