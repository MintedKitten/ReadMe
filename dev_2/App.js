// Invoke-Expression (((ConvertFrom-StringData (Get-Content .\android\local.properties -raw)).'sdk.dir')+'\emulator\emulator.exe -avd Pixel_3_API_29')
import 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {Overlay, Icon} from 'react-native-elements';
import {
  NativeBaseProvider,
  Box,
  Flex,
  Spacer,
  Center,
  Row,
  Column,
  FlatList,
  Image,
  ScrollView,
  Heading,
} from 'native-base';
import {AirbnbRating} from 'react-native-ratings';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const EditProfilePage = ({navigation}, forceUpdate) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <Icon
            name="checklist"
            type="octicon"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
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

const ProfilePage = ({navigation}, forceUpdate) => {
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
          />
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

const InformationPage = ({navigation}, forceUpdate) => {
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

  useEffect(() => {
    getData();
  }, []);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toOverlay, setToOverlay] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  const getData = async () => {
    setLoading(true);
    setDetails(getBookInformation());
    setLoading(false);
    forceUpdate();
  };

  const _onRefresh = () => {
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          // data from server
          data={details}
          //Extract the key with keyExtractor
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          // pull down to refresh
          onRefresh={() => {
            _onRefresh();
          }}
          // if refrash is true, then don't load just yet
          refreshing={loading}
          // render data
          renderItem={({item, index}) => (
            <Box flex="1" safeAreaTop>
              <ScrollView>
                <Column my={1}>
                  <Flex direction="row" safeAreaTop mx={1}>
                    <Center>
                      <Image
                        source={{uri: item.picture.src}}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                      />
                    </Center>
                    <Column mx={4}>
                      <Heading>{item.name}</Heading>
                      <Text>
                        {'By ' +
                          item.author +
                          '\n' +
                          item.page +
                          ' Pages\n' +
                          item.summary +
                          '\n' +
                          item.genre}
                      </Text>
                    </Column>
                    <Spacer />
                    <Column>
                      <Flex alignItems="flex-end" mr={1}>
                        <Icon
                          name="more"
                          type="material"
                          onPress={() => {
                            setToOverlay(getOneBookInformation(item.id));
                            toggleOverlay();
                          }}
                        />
                      </Flex>
                    </Column>
                  </Flex>
                </Column>
              </ScrollView>
            </Box>
          )}
        />
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => {
            toggleOverlay();
          }}>
          <View>
            <Text>This is an Overlay for History: </Text>
            <Text>{JSON.stringify(toOverlay)}</Text>
            <Icon
              name="book-check"
              type="material-community"
              size={20}
              color="black"
              style={{}}
              onPress={() => {
                toggleOverlay();
              }}
            />
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

// id, name, author, genre, picture, favorite
const testBookInformation = [
  {
    id: 1,
    name: 'Book 1',
    author: 'John Smith',
    page: 168,
    summary: 'Outer Space Cadeting',
    genre: 'Sci-fi, Romance',
    picture: {
      src: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy.png?alt=media&token=232056d1-7f3b-4d38-ad49-8634858ec228',
    },
    lastedit: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Book 2',
    author: 'William Shakespeare',
    page: 318,
    summary: 'History of Japan',
    genre: 'Asia History',
    picture: {
      src: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_v1.png?alt=media&token=fe80da21-76ad-47ae-b0f5-c782f9fea4fb',
    },
    lastedit: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Book 3',
    author: 'Patiparn Techawatcharapaikul',
    page: 169,
    summary: 'How to Fish Like a Pro',
    genre: 'Guide, Life Hack',
    picture: {
      src: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_v2.png?alt=media&token=e527dbb1-0fe6-40fb-b5e0-f3f5e478ee61',
    },
    lastedit: new Date().toISOString(),
  },
];

// id, bookid, status, pageread, rating
const testHistory = [
  {
    id: 1,
    bookid: 1,
    status: 'Complete',
    pageread: 168,
    rating: 3.5,
    lastedit: new Date().toISOString(),
  },
  {
    id: 2,
    bookid: 2,
    status: 'Reading',
    pageread: 158,
    rating: 4.1,
    lastedit: new Date().toISOString(),
  },
  {
    id: 3,
    bookid: 3,
    status: 'Dropped',
    pageread: 102,
    rating: 1,
    lastedit: new Date().toISOString(),
  },
];

const getBookInformation = () => {
  return testBookInformation;
};

const getReadingHistory = () => {
  let tempHistory = [];
  testHistory.forEach(element => {
    let info = getBookInformation().find(book => book.id === element.bookid);
    tempHistory.push({
      id: element.id,
      name: info.name,
      page: info.page,
      bookid: element.id,
      status: element.status,
      pageread: element.pageread,
      rating: element.rating,
      picture: info.picture,
    });
  });
  return tempHistory;
};

const getOneBookInformation = id => {
  return testBookInformation.find(book => book.id === id);
};

const getOneReadingHistory = id => {
  return getReadingHistory().find(hist => hist.id === id);
};

const HistoryPage = ({navigation}, forceUpdate) => {
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

  useEffect(() => {
    getData();
  }, []);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toOverlay, setToOverlay] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  const getData = async () => {
    setLoading(true);
    setDetails(getReadingHistory());
    setLoading(false);
    forceUpdate();
  };

  const _onRefresh = () => {
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          // data from server
          data={details}
          //Extract the key with keyExtractor
          keyExtractor={(item, index) => {
            return item.bookid.toString();
          }}
          // pull down to refresh
          onRefresh={() => {
            _onRefresh();
          }}
          // if refrash is true, then don't load just yet
          refreshing={loading}
          // render data
          renderItem={({item, index}) => (
            <Box flex="1" safeAreaTop>
              <ScrollView>
                <Column my={1}>
                  <Flex direction="row" safeAreaTop mx={1}>
                    <Center>
                      <Image
                        source={{uri: item.picture.src}}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                      />
                    </Center>
                    <Column mx={4} justifyContent="space-between">
                      <Column>
                        <Heading>{item.name}</Heading>
                        <Text>{item.status}</Text>
                      </Column>
                      <Text>
                        <AirbnbRating
                          count={5}
                          reviews={[]}
                          reviewSize={0}
                          size={10}
                          defaultRating={item.rating}
                          isDisabled={true}
                        />
                        <Text>{'  ' + item.rating}</Text>
                      </Text>
                    </Column>
                    <Spacer />
                    <Column>
                      <Flex alignItems="flex-end" mr={1}>
                        <Icon
                          name="more"
                          type="material"
                          color="black"
                          onPress={() => {
                            setToOverlay(getOneReadingHistory(item.id));
                            toggleOverlay();
                          }}
                        />
                      </Flex>
                    </Column>
                  </Flex>
                </Column>
              </ScrollView>
            </Box>
          )}
        />
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => {
            toggleOverlay();
          }}>
          <View>
            <Text>This is an Overlay for History: </Text>
            <Text>{JSON.stringify(toOverlay)}</Text>
            <Icon
              name="book-check"
              type="material-community"
              size={20}
              color="black"
              style={{}}
              onPress={() => {
                toggleOverlay();
              }}
            />
          </View>
        </Overlay>
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

const ProfileStack = forceUpdate => {
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
        {({navigation}) => ProfilePage({navigation}, forceUpdate)}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfile"
        options={{
          animation: 'slide_from_bottom',
          headerBackVisible: false,
          headerTitle: () => <Text>Edit Profile</Text>,
          headerRight: () => <Text></Text>,
        }}>
        {({navigation}) => EditProfilePage({navigation}, forceUpdate)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

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
          headerTitle: () => <Text>Book Information</Text>,
        }}>
        {({navigation}) => InformationPage({navigation}, forceUpdate)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

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
          headerTitle: () => <Text>Book History</Text>,
        }}>
        {({navigation}) => HistoryPage({navigation}, forceUpdate)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigationTab = () => {
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

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
          {() => HistoryStack(forceUpdate)}
        </Tab.Screen>
        <Tab.Screen
          name="InformationStack"
          options={{
            tabBarLabel: 'Information',
            title: 'Book Information',
          }}>
          {() => InformationStack(forceUpdate)}
        </Tab.Screen>
        <Tab.Screen
          name="ProfileStack"
          options={{
            tabBarLabel: 'Profile',
            title: 'Your Profile',
          }}>
          {() => ProfileStack(forceUpdate)}
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
  const [session, setSession] = useState('');

  return (
    // for testing Login First then App
    <NativeBaseProvider>
      {session.length > 0 ? <AppNavigationTab /> : <LoginNavigationStack />}
    </NativeBaseProvider>
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
