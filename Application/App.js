import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import NavigationComponent from './components/NavigationComponent';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 0);
  }, []);

  // AsyncStorage.removeItem('@session');

  // const getAllKeys = async () => {
  //   let jsonValue;
  //   try {
  //     jsonValue = await AsyncStorage.getAllKeys();
  //   } catch (e) {
  //     console.log('Error :' + e);
  //   }
  //   return jsonValue.length > 0 ? jsonValue : [];
  // };

  // getAllKeys().then(data => {
  //   if (!data.includes('@session')) {
  //     console.log('Setup @session token ');
  //     const testtoken = {token: ''};
  //     AsyncStorage.setItem('@session', JSON.stringify(testtoken));
  //   }
  // });

  return <NavigationComponent />;
};

export default App;
