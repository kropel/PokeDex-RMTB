import React, {useEffect, useState, useCallback} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';

import {fetchData} from './services/apiService';
import ListHeaderComponent from './components/ListHeaderComponent';
import {useDebounce} from './hooks/useDebounce';
import {useAsyncStorage} from './hooks/useAsyncStorage';

const App = () => {
  const [pokemonsList, setPokemonsList] = useAsyncStorage('@pokeDexList'); //orginalana list pobrana z serwera
  const [pokemons, setPokemons] = useState(pokemonsList); // lista filtrowana, bazująca na pokemonsList
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const barStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';

  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@pokeDexList');
      let value = null;

      if (list == null) {
        value = await fetchData();
      } else {
        value = list;
      }
      setPokemonsList(value);
      setPokemons(value);
    })();
  }, []);

  const debounceSearchTerm = useDebounce(searchTerm, 200);

  const filterPokemons = useCallback(
    (term) => {
      return pokemonsList.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      );
    },
    [pokemonsList],
  );

  useEffect(() => {
    let filtredPokemons = [];
    if (debounceSearchTerm) {
      filtredPokemons = filterPokemons(debounceSearchTerm);
    } else {
      filtredPokemons = pokemonsList;
    }

    setPokemons(filtredPokemons);
  }, [debounceSearchTerm, searchTerm, pokemonsList]);

  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    try {
      const list = await fetchData();
      setPokemons(list);
      setPokemonsList(list);
    } catch (err) {
      console.log(err);
    }
    setIsRefreshing(false);
  };

  return (
    <React.Fragment>
      <StatusBar barStyle={barStyle} backgroundColor="black" />
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={refreshPokemonsList}
          ListHeaderComponent={
            <ListHeaderComponent onChangeText={setSearchTerm} />
          }
          keyExtractor={(item, index) => item.name + index}
          data={pokemons}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
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
