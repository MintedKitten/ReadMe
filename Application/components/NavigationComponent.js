import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginNavigationStack from '../navigation/LoginNavigationStack';
import AppNavigationTab from '../navigation/AppNavigationTab';
import TryLogin from '../firebase/TryLogin';
import auth from '@react-native-firebase/auth';

const NavigationComponent = () => {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NativeBaseProvider>
        <LoginNavigationStack
          forceUpdate={() => {
            forceUpdate();
          }}
        />
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <AppNavigationTab />
      </NativeBaseProvider>
    );
  }
};

export default NavigationComponent;
