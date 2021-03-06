import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/headerButton/HeaderButton";
import ListItem from "../../../components/shop/listItem/ListItem";
import Colors from "../../../constants/Colors";
import { deleteProduct, getProducts } from "../../../store/actions/products";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

const UserProducts = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error  occurred!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

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
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const deleteDispatchHandler = useCallback(
    async (id) => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(deleteProduct(id));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you want to delete this item ?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: deleteDispatchHandler.bind(this, id),
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (userProducts.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="chatbox-outline" size={100} color={Colors.primary} />

        <Text style={styles.emptyList}>
          There's not products created, start creating some
          <FontAwesome5 name="smile-wink" size={24} color="black" />
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={userProducts}
      keyExtractor={(item) => item.id}
      style={{ width: "100%" }}
      renderItem={(itemData) => (
        <ListItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            title="Details"
            color={Colors.primary}
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF2E",
    width: "80%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyList: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
  },
});

UserProducts.navigationOptions = (navOptions) => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navOptions.navigation.navigate("EditProduct");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default UserProducts;
