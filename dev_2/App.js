import 'react-native-gesture-handler';
import {
  Animated,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {default as IonIcons} from 'react-native-vector-icons/Ionicons';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {default as MCIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as MatIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as OctIcons} from 'react-native-vector-icons/Octicons';

const Stackk = require('@react-navigation/stack').createStackNavigator();
const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const EditProfilePage = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <OctIcons
            name="checklist"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />{' '}
        </Text>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Edit Profile Page</Text>
        <Button
          title="back"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const ProfilePage = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <MCIcons
            name="pencil"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />{' '}
        </Text>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const InformationPage = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <IonIcons
            name="search-outline"
            size={20}
            color="white"
            onPress={() => {
              alert('search');
            }}
          />
          {'    '}
          <IonIcons
            name="heart"
            size={20}
            color="white"
            onPress={() => {
              alert('hey');
            }}
          />
          {'    '}
          <MCIcons
            name="book-plus"
            size={20}
            color="white"
            onPress={() => {
              alert('add book');
            }}
          />
          {'    '}
          <MCIcons
            name="book-remove"
            size={20}
            color="white"
            onPress={() => {
              alert('delete book');
            }}
          />{' '}
        </Text>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Book Information Page</Text>
      </View>
    </SafeAreaView>
  );
};

const HistoryPage = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <IonIcons
            name="search-outline"
            size={20}
            color="white"
            onPress={() => {
              alert('search');
            }}
          />
          {'    '}
          <IonIcons
            name="bookmark"
            size={20}
            color="white"
            onPress={() => {
              alert('favorite');
            }}
          />{' '}
        </Text>
      ),
    });
  }, []);
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login Page</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          bottom: 10,
        }}>
        <Text>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
            Don't have an account?
          </Text>
          {'  '}
          <Text
            style={{fontSize: 16, textAlign: 'center', color: 'black'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Register here.
          </Text>
        </Text>
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
      <Stack.Screen
        name="Profile"
        options={{
          animation: 'slide_from_right',
          headerTitle: () => <Text>Your Profile</Text>,
        }}>
        {({navigation}) => ProfilePage({navigation})}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfile"
        options={{
          animation: 'slide_from_bottom',
          headerBackVisible: false,
          headerTitle: () => <Text>Edit Profile</Text>,
          headerRight: () => <Text></Text>,
        }}>
        {({navigation}) => EditProfilePage({navigation})}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const InformationStack = () => {
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
          headerTitle: () => <Text>Book Information</Text>,
        }}>
        {({navigation}) => InformationPage({navigation})}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const HistoryStack = () => {
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
          headerTitle: () => <Text>Book History</Text>,
        }}>
        {({navigation}) => HistoryPage({navigation})}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigationTab = () => {
  return (
    <NavCon>
      <Tab.Navigator
        initialRouteName="HistoryStack"
        backBehavior="none"
        shifting={true}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let size = 20;
            let iconName = (
              <MCIcons name="progress-question" size={size} color={color} />
            );
            if (route.name === 'HistoryStack') {
              iconName = focused ? (
                <IonIcons name="book" size={size} color={color} />
              ) : (
                <FeatherIcon name="book" size={size} color={color} />
              );
            } else if (route.name === 'InformationStack') {
              iconName = focused ? (
                <MatIcons name="menu-book" size={size} color={color} />
              ) : (
                <MCIcons name="bookshelf" size={size} color={color} />
              );
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? (
                <IonIcons name="person" size={size} color={color} />
              ) : (
                <IonIcons name="person-outline" size={size} color={color} />
              );
            }
            return iconName;
            // return <Feather name={iconName} size={size} color={color} />;
          },
        })}
        activeColor="#2FA4FF"
        inactiveColor="#0E185F"
        barStyle={{paddingBottom: 20, backgroundColor: '#E8FFC2'}}>
        <Tab.Screen
          name="HistoryStack"
          options={{
            tabBarLabel: 'History',
            title: 'Book History',
          }}>
          {() => HistoryStack()}
        </Tab.Screen>
        <Tab.Screen
          name="InformationStack"
          options={{
            tabBarLabel: 'Information',
            title: 'Book Information',
          }}>
          {() => InformationStack()}
        </Tab.Screen>
        <Tab.Screen
          name="ProfileStack"
          options={{
            tabBarLabel: 'Profile',
            title: 'Your Profile',
          }}>
          {() => ProfileStack()}
        </Tab.Screen>
      </Tab.Navigator>
    </NavCon>
  );
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
  const [token, setToken] = useState(true);

  return (
    // for testing Login First then App
    // <>{token === true ? <AppNavigationTab /> : <LoginNavigationStack />}</>
    <LoginNavigationStack />
    // <AppNavigationTab />
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
