import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="New" component={NewScreen} />
      </Stack.Navigator>
    </NavCon>
  );
};

export default App;

const styles = StyleSheet.create({});
