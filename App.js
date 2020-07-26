import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import {fetchData} from './components/apiService';

const App = () => {
  const [pokemonsList, setPokemonsList] = useState([]);
  const barStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setPokemonsList(data);
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemonsList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.name + index}
              style={styles.button}
              onPress={() => {
                Alert.alert(item.name);
              }}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
  },
  button: {
    padding: 10,
  },
});

export default App;
