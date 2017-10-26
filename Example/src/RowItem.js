import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  text: {
    padding: 20,
    fontSize: 20,
  },
};

export default function ({ item }) {
  return (
    <View>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
}
