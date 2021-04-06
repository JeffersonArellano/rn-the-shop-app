import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../../constants/Colors';

const ListItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...props.style, ...styles.container }}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetails} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonsGroup}>
              <Button
                title='Details'
                color={Colors.primary}
                onPress={props.onViewDetails}
              />
              <Button
                title='To Cart'
                color={Colors.primary}
                onPress={props.onViewCart}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default ListItem;
