import {Text} from 'react-native';
import React from 'react';
import HistoryPage from '../pages/HistoryPage';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();

const HistoryStack = forceUpdate => {
  return (
    <Stack.Navigator
      initialRouteName="History"
      screenOptions={{
        headerStyle: {backgroundColor: '#2FA4FF'},
        headerTintColor: '00FFDD',
      }}>
      <Stack.Screen
        name="History"
        options={{
          animation: 'slide_from_left',
          headerTitle: () => (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Book History
            </Text>
          ),
        }}>
        {({navigation}) => HistoryPage(forceUpdate)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HistoryStack;
