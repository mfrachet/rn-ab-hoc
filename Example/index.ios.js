/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import List from "./src/List.ab-test";
import data from "./src/data";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <List
          data={data}
          variant="ListView"
          onVariantSelect={variant => console.log(variant)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("Example", () => Example);
