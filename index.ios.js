/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import abHoc from './src/reactNativeAbHoc';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  a: {
    backgroundColor: 'red',
  },
  b: {
    backgroundColor: 'blue',
  },
});

class A extends Component {
  render() {
    return (
      <View style={[styles.container, styles.a]}>
        <Text>A</Text>
      </View>
    );
  }
}

const B = () => (
  <View style={[styles.container, styles.b]}>
    <Text>B</Text>
  </View>
);

const C = () => (
  <View style={[styles.container, styles.b]}>
    <Text>C</Text>
  </View>
);

const GenericComponent = abHoc('Experiment 1',
  { variant: 'A', component: A },
  { variant: 'B', component: B },
);

export default class ReactNativeAbHoc extends Component {
  render() {
    return (
      <GenericComponent truc="paaaf" />
    );
  }
}

AppRegistry.registerComponent('ReactNativeAbHoc', () => ReactNativeAbHoc);
