import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { createProduct, updateProduct } from '../../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../../components/UI/headerButton/HeaderButton';
import Colors from '../../../constants/Colors';

const EditProduct = (props) => {
  const prodId = props.navigation.getParam('productId');

  const dispatch = useDispatch();
  const productToEdit = useSelector((state) =>
    state.products.availableProducts.find((prop) => prop.id === prodId)
  );

  const [productState, setProductState] = useState({
    data: {
      id: productToEdit ? productToEdit.id : '',
      title: productToEdit ? productToEdit.title : '',
      imageUrl: productToEdit ? productToEdit.imageUrl : '',
      price: '',
      description: productToEdit ? productToEdit.description : '',
    },
    errors: {},
  });

  const errors = {};

  const validateData = useCallback(
    (product) => {
      if (!product.data.title) {
        errors.title = {
          message: 'Please enter a valid Title',
        };
      }
      if (!product.data.imageUrl) {
        errors.imageUrl = {
          message: 'Please enter a valid ImageUrl',
        };
      }
      if (!product.data.price) {
        errors.price = {
          message: 'Please enter a valid Price',
        };
      }
      if (!product.data.description) {
        errors.description = {
          message: 'Please enter a Description',
        };
      }
      return errors;
    },
    [productState]
  );

  const updateProductHandler = (newItem) => {
    setProductState({
      ...productState,
      data: { ...productState.data, ...newItem },
    });
  };

  const submitHandler = useCallback(() => {
    const errors = validateData(productState);
    setProductState({ ...productState, errors });

    if (!Object.keys(errors).length > 0) {
      if (productToEdit) {
        dispatch(updateProduct(productState));
      } else {
        dispatch(createProduct(productState));
      }
      props.navigation.goBack();
    }

    Alert.alert('Missing data!', 'Please check the errors in the form', [
      {
        text: 'Ok',
      },
    ]);
  }, [dispatch, validateData, productState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={{ ...props.style, ...styles.form }}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={productState.data.title}
            onChangeText={(text) => updateProductHandler({ title: text })}
            autoCapitalize='sentences'
          ></TextInput>
          {productState.errors.title?.message && (
            <Text style={{ color: Colors.primary }}>
              {productState.errors.title.message}
            </Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={productState.data.imageUrl}
            onChangeText={(text) => updateProductHandler({ imageUrl: text })}
          ></TextInput>
          {productState.errors.imageUrl?.message && (
            <Text style={{ color: Colors.primary }}>
              {productState.errors.imageUrl.message}
            </Text>
          )}
        </View>
        {productToEdit ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              keyboardType='decimal-pad'
              style={styles.input}
              value={productState.data.price}
              onChangeText={(text) =>
                updateProductHandler({ price: parseFloat(text) })
              }
            ></TextInput>
            {productState.errors.price?.message && (
              <Text style={{ color: Colors.primary }}>
                {productState.errors.price.message}
              </Text>
            )}
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            value={productState.data.description}
            onChangeText={(text) => updateProductHandler({ description: text })}
          ></TextInput>
          {productState.errors.description?.message && (
            <Text style={{ color: Colors.primary }}>
              {productState.errors.description.message}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

EditProduct.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
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
  formControl: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontFamily: 'open-sans',
    fontSize: 16,
    width: '30%',
    margin: 4,
  },
  input: {
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 16,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderColor: '#888',
  },
});

export default EditProduct;
