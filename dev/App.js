import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="To New"
        onPress={() => {
          navigation.navigate('New');
        }}
      />
    </View>
  );
}

function NewScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>New Screen</Text>
      <Button
        title="Back Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const App = () => {
  return (
    <NavCon>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'New') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            // return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New" component={NewScreen} />
      </Tab.Navigator>
    </NavCon>
  );
};

export default App;

const styles = StyleSheet.create({});
