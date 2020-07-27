import * as React from 'react';
import {View, Text} from 'react-native';

const DetailsView = ({route}) => {
  const {name} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{name}</Text>
    </View>
  );
};

export default DetailsView;
