import 'react-native-gesture-handler';
import {StyleSheet, Text, View, Button, Animated} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
        title="to More"
        onPress={() => {
          navigation.navigate('More');
        }}
      />
    </View>
  );
}

function MoreScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>More Screen</Text>
      <Button
        title="Back Home"
        onPress={() => {
          navigation.navigate('New');
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
        options={{
          animation: 'fade',
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
              />
              {'  '}
              <Ionicons
                name="person-add"
                size={20}
                color="blue"
                onPress={() => {
                  alert('2');
                }}
              />
              {'  '}
              <Ionicons
                name="person-add"
                size={20}
                color="green"
                onPress={() => {
                  alert('3');
                }}
              />
            </Text>
          ),
        }}
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

function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="New"
        component={NewScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

function NewStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="New"
        component={NewScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

function TestStackA() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="New"
        component={NewScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

function TestStackB() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      shifting={true}
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
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        // tabBarActiveTintColor: '#e91e63',
        // tabBarInactiveTintColor: '#000',
        tabBarColor: 'purple',
      })}
      backBehavior="history"
      activeColor="blue"
      inactiveColor="green">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Woah',
        }}
      />
      <Tab.Screen name="NewStack" component={NewStack} />
    </Tab.Navigator>
  );
}

const Contact = () => {
  return (
    <View
      styles={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <Text>This is Contact</Text>
    </View>
  );
};

const About = () => {
  return (
    <View
      styles={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <Text>This is About</Text>
    </View>
  );
};

const Home = ({navigation}) => {
  return (
    <View
      styles={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <Text>This is the Home Page</Text>
      <Button
        title="Go to About"
        onPress={() => {
          navigation.navigate('About');
        }}
      />
    </View>
  );
};

// const progress = Animated.add(
//   current.progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   }),
//   next
//     ? next.progress.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 1],
//         extrapolate: 'clamp',
//       })
//     : 0,
// );

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {open: config, close: config},
  cardStyleInterpolator: forSlide,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

function NavigationPage() {
  return (
    <NavCon>
      <Tab.Navigator screenOptions={screenOptionStyle}>
        <Tab.Screen name="HomeTab" component={MainStackNavigator} />
        <Tab.Screen name="ContactTab" component={ContactStackNavigator} />
      </Tab.Navigator>
    </NavCon>
  );
}

const App = () => {
  return <NavigationPage />;
};

export default App;

const styles = StyleSheet.create({});
