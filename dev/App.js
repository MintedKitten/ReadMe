import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="To New"
        onPress={() => {
          navigation.navigate('NewStack', {screen: 'New'});
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
          navigation.navigate('HomeStack', {screen: 'Home'});
        }}
      />
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
    </Stack.Navigator>
  );
}

function NewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New" component={NewScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavCon>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'NewStack') {
              iconName = focused ? 'person-add-outline' : 'person-add';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: '#000',
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerTitle: () => (
              <Ionicons name="person-add" size={20} color="pink" />
            ),
            headerRight: () => (
              <Text>
                <Ionicons
                  name="person-add"
                  size={20}
                  color="brown"
                  onPress={() => {
                    alert('1');
                  }}
                />{' '}
                <Ionicons
                  name="person-add"
                  size={20}
                  color="blue"
                  onPress={() => {
                    alert('2');
                  }}
                />{' '}
                <Ionicons
                  name="person-add"
                  size={20}
                  color="green"
                  onPress={() => {
                    alert('3');
                  }}
                />{' '}
              </Text>
            ),
            title: 'Woah',
          }}
        />
        <Tab.Screen name="NewStack" component={NewStack} />
      </Tab.Navigator>
    </NavCon>
  );
};

export default App;

const styles = StyleSheet.create({});
