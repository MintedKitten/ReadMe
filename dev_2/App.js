// Invoke-Expression (((ConvertFrom-StringData (Get-Content .\dev_2\android\local.properties -raw)).'sdk.dir')+'\emulator\emulator.exe -avd Pixel_2_API_29')
import 'react-native-gesture-handler'; 
import {
  Animated,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {default as IonIcons} from 'react-native-vector-icons/Ionicons';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {default as MCIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as MatIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as OctIcons} from 'react-native-vector-icons/Octicons';
import {Overlay, Icon} from 'react-native-elements';
import useStateRef from 'react-usestateref';

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
      </View>
    </SafeAreaView>
  );
};

const ProfilePage = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <Icon
            name="pencil"
            type="material-community"
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
          <Icon
            name="search-outline"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('search');
            }}
          />
          {'   '}
          <Icon
            name="heart"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('hey');
            }}
          />
          {'   '}
          <Icon
            name="book-plus"
            type="material-community"
            size={20}
            color="white"
            onPress={() => {
              alert('add book');
            }}
          />
          {'   '}
          <Icon
            name="book-remove"
            type="material-community"
            size={20}
            color="white"
            onPress={() => {
              alert('delete book');
            }}
          />
        </Text>
      ),
    });
  }, []);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
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
          <Icon
            name="search-outline"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('search');
            }}
          />
          {'   '}
          <Icon
            name="bookmark"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('favorite');
            }}
          />
        </Text>
      ),
    });
  }, []);

  const [visible, setVisible] = useState(false);

  function useForceUpdate() {
    const [force, setForce] = useState(0);
    return () => setForce(++force);
  }

  const toggleOverlay = () => {
    setVisible(!visible);
    useForceUpdate();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Reading History Page</Text>
      <Button
        title="Open Overlay"
        onPress={() => {
          toggleOverlay();
        }}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={() => {
          toggleOverlay();
        }}>
        <View>
          <Text>This is an Overlay</Text>
          <Icon
            name="book-check"
            type="material-community"
            size={20}
            color="black"
            onPress={() => {
              toggleOverlay();
            }}
          />
        </View>
      </Overlay>
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
              <Icon
                type="material-community"
                name="progress-question"
                size={size}
                color={color}
              />
            );
            if (route.name === 'HistoryStack') {
              iconName = focused ? (
                <Icon type="ionicon" name="book" size={size} color={color} />
              ) : (
                <Icon type="feather" name="book" size={size} color={color} />
              );
            } else if (route.name === 'InformationStack') {
              iconName = focused ? (
                <Icon
                  type="material"
                  name="menu-book"
                  size={size}
                  color={color}
                />
              ) : (
                <Icon
                  type="material-community"
                  name="bookshelf"
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? (
                <Icon type="ionicon" name="person" size={size} color={color} />
              ) : (
                <Icon
                  type="ionicon"
                  name="person-outline"
                  size={size}
                  color={color}
                />
              );
            }
            return iconName;
          },
        })}
        activeColor="#2FA4FF"
        inactiveColor="#0E185F"
        keyboardHidesNavigationBar={true}
        barStyle={{paddingBottom: 0, backgroundColor: '#E8FFC2'}}>
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
  const [session, setSession] = useState('test_token');

  return (
    // for testing Login First then App
    <>{session.length > 0 ? <AppNavigationTab /> : <LoginNavigationStack />}</>
    // <LoginNavigationStack />
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
