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
    console.log('nav');
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

  // const [unlock, setUnlock] = useState(true);
  // if (unlock) {
  //   const getItem = async () => {
  //     return await AsyncStorage.getItem('@session');
  //   };
  //   getItem().then(value => {
  //     let session = JSON.parse(value);
  //     if (session.token.length > 0) {
  //       if (TryLogin(session.token)) {
  //         setUnlock(false);
  //       } else {
  //         AsyncStorage.removeItem('@session');
  //         return;
  //       }
  //     }
  //   });
  //   return (
  //     <NativeBaseProvider>
  //       <LoginNavigationStack
  //         forceUpdate={() => {
  //           forceUpdate();
  //         }}
  //       />
  //     </NativeBaseProvider>
  //   );
  // }

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
    auth()
      .currentUser.getIdToken()
      .then(token => {
        AsyncStorage.setItem('@session', token);
      });
    console.log(auth().currentUser);
    return (
      <NativeBaseProvider>
        <AppNavigationTab />
      </NativeBaseProvider>
    );
  }
};

export default NavigationComponent;
