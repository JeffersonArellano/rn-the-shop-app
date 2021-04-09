import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
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

  const [product, setProduct] = useState({
    id: productToEdit ? productToEdit.id : '',
    title: productToEdit ? productToEdit.title : '',
    imageUrl: productToEdit ? productToEdit.imageUrl : '',
    price: '',
    description: productToEdit ? productToEdit.description : '',
  });

  const updateProductHandler = (newItem) => {
    setProduct({ ...product, ...newItem });
  };

  const submitHandler = useCallback(() => {
    if (productToEdit) {
      dispatch(updateProduct(product));
    } else {
      dispatch(createProduct(product));
    }

    props.navigation.goBack();
  }, [dispatch, product]);

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
            value={product.title}
            onChangeText={(text) => updateProductHandler({ title: text })}
          ></TextInput>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={product.imageUrl}
            onChangeText={(text) => updateProductHandler({ imageUrl: text })}
          ></TextInput>
        </View>
        {productToEdit ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              value={product.price}
              onChangeText={(text) =>
                updateProductHandler({ price: parseFloat(text) })
              }
            ></TextInput>
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            value={product.description}
            onChangeText={(text) => updateProductHandler({ description: text })}
          ></TextInput>
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
    borderColor: Colors.primary,
  },
});

export default EditProduct;
