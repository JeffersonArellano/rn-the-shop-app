import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { authenticateUser } from "../store/actions/auth";

const StartupAuth = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("AuthNavigator");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expireDate } = transformedData;
      const expirationDate = new Date(expireDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("AuthNavigator");
        return;
      }
      const expDate = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate("ShopNavigator");
      dispatch(authenticateUser({ userId, token, expiresIn: expDate }));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupAuth;
