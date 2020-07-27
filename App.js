import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from './Views/HomeView';
import DetailsView from './Views/DetailsView';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Details" component={DetailsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
