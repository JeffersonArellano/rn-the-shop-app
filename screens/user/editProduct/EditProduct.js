import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { createProduct, updateProduct } from "../../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/headerButton/HeaderButton";
import CustomInput from "../../../components/UI/input/Input";
import Colors from "../../../constants/Colors";

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

const EditProduct = (props) => {
  const prodId = props.navigation.getParam("productId");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const productToEdit = useSelector((state) =>
    state.products.availableProducts.find((prop) => prop.id === prodId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      id: productToEdit ? productToEdit.id : "",
      title: productToEdit ? productToEdit.title : "",
      imageUrl: productToEdit ? productToEdit.imageUrl : "",
      price: "",
      description: productToEdit ? productToEdit.description : "",
    },
    inputValidities: {
      title: productToEdit ? true : false,
      imageUrl: productToEdit ? true : false,
      price: productToEdit ? true : false,
      description: productToEdit ? true : false,
    },
    formIsValid: productToEdit ? true : false,
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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Missing data!", "Please check the errors in the form", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    formState.inputValues.price = +formState.inputValues.price;

    setError(null);
    setIsLoading(true);

    try {
      if (productToEdit) {
        await dispatch(updateProduct(formState.inputValues));
      } else {
        await dispatch(createProduct(formState.inputValues));
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "height" : "padding"}
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={{ ...props.style, ...styles.form }}>
          <CustomInput
            id="title"
            label="Title"
            onInputChange={inputChangeHandler}
            errorMessage="Please enter a valid Title"
            initialValue={productToEdit ? productToEdit.title : ""}
            initiallyValid={!!productToEdit}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required
          />
          <CustomInput
            id="imageUrl"
            label="Image Url"
            onInputChange={inputChangeHandler}
            errorMessage="Please enter a valid ImageUrl"
            keyboardType="default"
            returnKeyType="next"
            initialValue={productToEdit ? productToEdit.imageUrl : ""}
            initiallyValid={!!productToEdit}
            required
          />
          {productToEdit ? null : (
            <CustomInput
              id="price"
              label="Price"
              onInputChange={inputChangeHandler}
              errorMessage="Please enter a valid Price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0.1}
            />
          )}
          <CustomInput
            id="description"
            label="Description"
            onInputChange={inputChangeHandler}
            miltiline
            numberOfLines={4}
            errorMessage="Please enter a valid Description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            initialValue={productToEdit ? productToEdit.description : ""}
            initiallyValid={!!productToEdit}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProduct.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitHandler}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProduct;
