import {Text} from 'react-native';
import React from 'react';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();

const ProfileStack = forceUpdate => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {backgroundColor: '#09c1f8'},
        headerTintColor: '00FFDD',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="Profile"
        options={{
          animation: 'slide_from_right',
          headerTitle: () => (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Your Profile
            </Text>
          ),
        }}>
        {({navigation}) => ProfilePage({navigation}, forceUpdate)}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfile"
        options={{
          animation: 'slide_from_bottom',
          headerBackVisible: false,
          headerTitle: () => (
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Edit Profile
            </Text>
          ),
        }}>
        {({navigation, route}) =>
          EditProfilePage({navigation, route}, forceUpdate)
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
