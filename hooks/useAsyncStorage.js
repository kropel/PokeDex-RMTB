import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';

export const useAsyncStorage = (key) => {
  const [storedValue, setValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const stringifiedValue = await AsyncStorage.getItem(key);
        const value =
          stringifiedValue !== null ? JSON.parse(stringifiedValue) : null;
        setValue(value);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [key]);

  const setStoredValu = async (value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setStoredValu];
};
