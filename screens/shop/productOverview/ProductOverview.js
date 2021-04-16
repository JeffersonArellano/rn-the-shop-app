import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import ListItem from "../../../components/shop/listItem/ListItem";
import { addToCart } from "../../../store/actions/cart";
import { getProducts } from "../../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/headerButton/HeaderButton";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ProductOverview = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setErrorMessage(null);
    setIsRefreshing(true);
    try {
      await dispatch(getProducts());
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsloading, setErrorMessage]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsloading(true);
    loadProducts().then(() => {
      setIsloading(false);
    });
  }, [dispatch, loadProducts]);

  const selectedItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
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
          title="Details"
          color={Colors.primary}
          onPress={() =>
            selectedItemHandler(itemData.item.id, itemData.item.title)
          }
        />
        <Button
          title="To Cart"
          color={Colors.primary}
          onPress={() => dispatch(addToCart(itemData.item))}
        />
      </ListItem>
    );
  };

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Ionicons name="sad-outline" size={80} color={Colors.primary} />
        <Text style={styles.emptyProducts}>{errorMessage}</Text>
        <View style={styles.buttonError}>
          <Button
            color={Colors.primary}
            title="try Again"
            onPress={loadProducts}
          />
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cart" size={80} color={Colors.primary} />
        <Text style={styles.emptyProducts}>
          No Products found, maybe start adding some.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={itemList}
      style={{ width: "100%" }}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyProducts: {
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
  },
  buttonError: {
    marginVertical: 20,
    fontFamily: "open-sans",
  },
});

ProductOverview.navigationOptions = (navOptions) => {
  return {
    headerTitle: "Products",
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

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navOptions.navigation.navigate("Cart");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductOverview;
