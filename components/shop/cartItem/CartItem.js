import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={{ ...props.style, ...styles.itemContainer }}>
      <View style={styles.imageContent}>
        <Image style={styles.image} source={{ uri: props.imageUrl }} />
      </View>
      <View style={styles.description}>
        <View style={styles.itemData}>
          <Text style={styles.quantity}> {props.quantity} </Text>
          <Text style={styles.mainText} numberOfLines={3}>
            {props.title}
          </Text>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
          {props.deletable && (
            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.deleteButton}
            >
              <Ionicons
                name={Platform.os === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color='red'
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  description: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    overflow: 'hidden',
  },
  quantity: { fontFamily: 'open-sans', color: '#888', fontSize: 16 },
  mainText: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  deleteButton: { marginLeft: '20%' },
  imageContent: {
    height: 60,
    width: 60,
    borderRadius: 10,
    width: '20%',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 5,
  },
});

export default CartItem;
