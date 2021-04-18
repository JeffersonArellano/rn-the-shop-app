import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import CustomInput from "../../../components/UI/input/Input";
import Card from "../../../components/UI/card/Card";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { signup, login } from "../../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidiaties = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidiaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidiaties[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updateValues,
      inputValidities: updatedValidiaties,
    };
  }
  return state;
};

const UserAuth = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputName, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputName,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error  occurred!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Missing data!", "Please check the errors in the form", [
        {
          text: "Ok",
        },
      ]);
      return;
    }
    const action = isSignup
      ? signup(formState.inputValues.email, formState.inputValues.password)
      : login(formState.inputValues.email, formState.inputValues.password);

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("ShopNavigator");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState, isSignup]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.logo}>
              <Text style={styles.logoLegend}>The React Super Shop</Text>
              <MaterialIcons
                name="storefront"
                color={Colors.primary}
                size={100}
              />
            </View>
            <View style={styles.InputFields}>
              <CustomInput
                id="email"
                label="E-mail"
                errorMessage={"Please enter a valid email address"}
                keyboardType="email-address"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                required
                email
              />
              <CustomInput
                id="password"
                label="Password"
                errorMessage={"Plase enter a valid Password"}
                secureTextEntry={true}
                onInputChange={inputChangeHandler}
                required
                minLength={5}
              />
            </View>
            <View style={styles.buttonGroup}>
              {isLoading ? (
                <View style={styles.centered}>
                  <ActivityIndicator size="small" color={Colors.primary} />
                </View>
              ) : (
                <Button
                  color={Colors.primary}
                  title={isSignup ? "Sign Up" : "Login"}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonGroup}>
              <Button
                color={Colors.accent}
                title={isSignup ? "Switch to Login" : "Switch to Sign Up"}
                onPress={() => setIsSignup((prevState) => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "90%",
    maxWidth: 400,
    height: "80%",
    maxHeight: 600,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { justifyContent: "center", alignItems: "center", width: "100%" },
  logoLegend: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  InputFields: {
    width: "100%",
  },
  buttonGroup: {
    marginTop: 10,
    fontFamily: "open-sans",
  },
});

export default UserAuth;
