import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { addToCart } from '../../../store/actions/cart';
import Colors from '../../../constants/Colors';

const ProductDetail = (props) => {
  const productId = props.navigation.getParam('producId');
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.button}>
        <Button
          color={Colors.primary}
          title='Add to  Cart'
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
  button: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    color: '#888',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
});

ProductDetail.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};

export default ProductDetail;
