import 'react-native-gesture-handler';
import {
  Animated,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer as NavCon} from '@react-navigation/native';
const Stackk = require('@react-navigation/stack').createStackNavigator();
const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();

const EditProfilePage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Edit Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const ProfilePage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const InformationPage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Book Information Page</Text>
      </View>
    </SafeAreaView>
  );
};

const HistoryPage = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Reading History Page</Text>
      </View>
    </SafeAreaView>
  );
};

const RegisterPage = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>Register Page</Text>
        <Button
          title="To Login"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const LoginPage = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>Login Page</Text>
        <Button
          title="To Register"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {backgroundColor: '#2FA4FF'},
        headerTintColor: '00FFDD',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Profile">
        {({navigation}) => ProfilePage({navigation})}
      </Stack.Screen>
      <Stack.Screen name="EditProfile">
        {({navigation}) => EditProfilePage({navigation})}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigationTab = () => {
  return <NavCon></NavCon>;
};

const LoginNavigationStack = () => {
  return (
    <NavCon>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {backgroundColor: '#2FA4FF'},
          headerTintColor: '00FFDD',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="Login"
          options={{
            animation: 'slide_from_left',
            headerShown: false,
          }}>
          {({navigation}) => LoginPage({navigation})}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          options={{animation: 'slide_from_right', headerShown: false}}>
          {({navigation}) => RegisterPage({navigation})}
        </Stack.Screen>
      </Stack.Navigator>
    </NavCon>
  );
};

const NavigationComponent = () => {
  return (
    // for testing Login First then App
    <LoginNavigationStack />
  );
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 0);
  }, []);

  return <NavigationComponent />;
};

export default App;

const styles = StyleSheet.create({});
