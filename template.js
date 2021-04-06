import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ComponentName = (props) => {
  return <View style={{ ...props.style, ...styles.container }}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF2E',
    width: '80%',
  },
});

export default ComponentName;
