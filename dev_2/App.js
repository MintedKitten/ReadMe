import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

const EditProfilePage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Edit Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const ProfilePage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const InformationPage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Book Information Page</Text>
      </View>
    </SafeAreaView>
  );
};

const HistoryPage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Reading History Page</Text>
      </View>
    </SafeAreaView>
  );
};

const RegisterPage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Register Page</Text>
      </View>
    </SafeAreaView>
  );
};

const LoginPage = ({navigate}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Login Page</Text>
      </View>
    </SafeAreaView>
  );
};

const ProfileStack = () => {};

const AppNavigationTab = () => {};

const LoginNavigationStack = () => {};

const NavigationComponent = () => {};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 0);
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
