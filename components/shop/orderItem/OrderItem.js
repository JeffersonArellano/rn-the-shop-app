import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import CartItem from '../cartItem/CartItem';
import Colors from '../../../constants/Colors';
import Card from '../../UI/card/Card';
const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={{ ...props.style, ...styles.orderItem }}>
      <View style={styles.dateSummary}>
        <Text style={styles.dateLabel}>Date : </Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.summary}>
        <Text>Total price :</Text>
        <Text style={styles.amount}>${props.totalAmount.toFixed(2)}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide details' : 'Show Details'}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.details}>
          {props.items.map((item) => (
            <CartItem
              key={item.productId}
              imageUrl={item.imageUrl}
              title={item.productTitle}
              amount={item.sum}
              quantity={item.quantity}
              onRemove={() => {}}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '45%',
    marginBottom: 15,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  dateSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLabel: { fontFamily: 'open-sans', color: 'black', fontSize: 16 },
  date: { fontFamily: 'open-sans', fontSize: 16, color: '#888' },
  details: {
    width: '100%',
  },
});

export default OrderItem;
