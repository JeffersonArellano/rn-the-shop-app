import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const ProductDetail = (props) => {
  const productId = props.navigation.getParam('producId');

  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView style={{ ...props.style, ...styles.container }}>
      <View>
        <Image style={styles.image} source={{ uri: product.imageUrl }} />
        <Text>Details of product {product.id}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF2E',
  },
  image: {
    height: 300,
    width: '90%',
    margin: 10,
  },
});

ProductDetail.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};

export default ProductDetail;
