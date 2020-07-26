import React from 'react';
import {View, TextInput} from 'react-native';

const ListHeaderComponent = (props) => (
  <View>
    <TextInput placeholder="Sarch..." {...props} />
  </View>
);

export default ListHeaderComponent;
