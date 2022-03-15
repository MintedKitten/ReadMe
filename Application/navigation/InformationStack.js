import {Text} from 'react-native';
import React from 'react';
import InformationPage from '../pages/InformationPage';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();

const InformationStack = forceUpdate => {
  return (
    <Stack.Navigator
      initialRouteName="Information"
      screenOptions={{
        headerStyle: {backgroundColor: '#2FA4FF'},
        headerTintColor: '00FFDD',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="Information"
        options={{
          animation: 'slide_from_right',
          headerTitle: () => (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Book Information
            </Text>
          ),
        }}>
        {({navigation}) => InformationPage({navigation}, forceUpdate)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InformationStack;
