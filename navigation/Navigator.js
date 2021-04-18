import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  ProductOverview,
  ProductDetail,
  Cart,
  Orders,
  UserProducts,
  EditProduct,
  UserAuth,
} from "../screens/index";
import Colors from "../constants/Colors";
import { Ionicons, Entypo } from "@expo/vector-icons";

const defaultOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: { fontFamily: "open-sans-bold" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigation = createStackNavigator(
  {
    ProductOverview,
    ProductDetail,
    Cart,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultOption,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultOption,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts,
    EditProduct,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Entypo name="add-to-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultOption,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigation,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    UserAuth,
  },
  {
    headerMode: "none",
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const MainNavigator = createSwitchNavigator(
  {
    AuthNavigator,
    ShopNavigator,
  },
  {}
);

export default createAppContainer(MainNavigator);
