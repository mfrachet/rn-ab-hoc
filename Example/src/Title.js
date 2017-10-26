import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
};

export default function ({ value, color }) {
  const style = { ...styles.title, backgroundColor: color };
  return (
    <View>
      <Text style={style}>{value}</Text>
    </View>
  );
}
