import React from 'react';
import { View, ListView } from 'react-native';
import RowItem from './RowItem';
import Title from './Title';

export default class CustomListView extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows(props.data) };
  }

  static renderRow(title) {
    return <RowItem item={{ title }} />;
  }

  /**
	 * Render the CustomListView
	 */
  render() {
    return (
      <View>
        <Title value="Variant ListView" color="#EF5350" />
        <ListView dataSource={this.state.dataSource} renderRow={CustomListView.renderRow} />
      </View>
    );
  }
}
