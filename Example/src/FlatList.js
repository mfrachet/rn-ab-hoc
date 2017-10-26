import React from 'react';
import { View, FlatList } from 'react-native';
import RowItem from './RowItem';
import Title from './Title';

export default class CustomFlatList extends React.Component {
  static renderRow({ item }) {
    return <RowItem item={{ title: item }} />;
  }

  /**
   * Render the CustomListView
   */
  render() {
    return (
      <View>
        <Title value="Variant FlatList" color="#5C6BC0" />
        <FlatList data={this.props.data} renderItem={CustomFlatList.renderRow} />
      </View>
    );
  }
}
