import React from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();

const LoginNavigationStack = ({forceUpdate}) => {
  return (
    <NavCon>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {backgroundColor: '#09c1f8'},
          headerTintColor: '00FFDD',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="Login"
          options={{
            animation: 'slide_from_left',
            headerShown: false,
          }}>
          {({navigation}) => LoginPage({navigation}, forceUpdate)}
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

export default LoginNavigationStack;
