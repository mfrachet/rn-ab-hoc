import AbHoc from 'react-native-ab-hoc';
import FlatList from './FlatList';
import ListView from './ListView';

export default AbHoc(
  'ListView',
  { variant: 'ListView', component: ListView },
  { variant: 'FlatList', component: FlatList },
);
