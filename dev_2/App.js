// Invoke-Expression (((ConvertFrom-StringData (Get-Content .\android\local.properties -raw)).'sdk.dir')+'\emulator\emulator.exe -avd Pixel_3_API_29')
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
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
  Container,
  FormControl,
  Stack as FormStack,
  Input,
  Button,
  InputLeftAddon,
  InputGroup,
  TextArea,
} from 'native-base';
import {AirbnbRating} from 'react-native-ratings';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const testProfile = [
  {
    id: 1,
    name: 'John Deere',
    genre: 'Sci-fi, Walking on the beach, and comedy',
    bio: 'Just doing fine in the pandemic',
    picture: require('./assets/profile_dummy.jpg'),
  },
  {
    id: 2,
    name: 'Mary Jane',
    genre: 'Romance, Walking on the beach, and Science',
    bio: 'Having a lovely day',
    picture: require('./assets/profile_female.jpg'),
  },
];

const getOneProfile = id => {
  return testProfile.find(profile => profile.id === id);
};

const TryEditProfile = (id, value) => {
  // Attempt to edit book history failed return false and alert, otherwise true
  console.log(id, value);

  return true;
};

const EditProfilePage = ({navigation, route}, forceUpdate) => {
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
              if (TryEditProfile(route.params.id, submitted)) {
                navigation.navigate('Profile');
              }
            }}
          />
        </Text>
      ),
    });
  }, []);

  let profileId = route.params.id;

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    genre: Yup.string(),
    bio: Yup.string(),
    picture: Yup.mixed(),
  });

  const [profile, setProfile] = useState(getOneProfile(profileId));
  let submitted = profile;

  const onSubmit = value => {
    submitted = value;
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Formik
        validateSchema={validateSchema}
        //the starting value
        initialValues={{
          name: profile.name,
          genre: profile.genre,
          bio: profile.bio,
          picture: profile.picture,
        }}
        //onsubmitting the form alert, later firebase
        onSubmit={async (values, {setSubmitting}) => {
          try {
            onSubmit(values);
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Row>
              <Image
                source={values.picture}
                alt="Profile Picture"
                size="xl"
                borderRadius={10}
                defaultSource={require('./assets/dummy_book.png')}
                style={{borderRadius: 80}}
              />
              <Icon
                name="camera-reverse"
                type="ionicon"
                size={30}
                color="black"
                style={{marginLeft: 10}}
                onPress={async () => {
                  const result = await launchImageLibrary({mediaType: 'photo'});
                  if (!result.didCancel) {
                    console.log(result.assets);
                  }
                }}
              />
            </Row>
            <FormControl>
              <FormStack space={1} justifyContent="center" ml={2} mr={2} mt={5}>
                <FormStack>
                  <Input
                    width="100%"
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Name'}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    fontSize={20}
                    borderColor={
                      errors.name && touched.name ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.name && touched.name && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.name}
                      </Text>
                    )}
                  </Text>
                </FormStack>
                <FormStack>
                  <TextArea
                    width="100%"
                    numberOfLines={3}
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Bio'}
                    value={values.bio}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    fontSize={20}
                    borderColor={
                      errors.bio && touched.bio ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.bio && touched.bio && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.bio}
                      </Text>
                    )}
                  </Text>
                </FormStack>
                <FormStack>
                  <TextArea
                    width="100%"
                    numberOfLines={3}
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Genre'}
                    value={values.genre}
                    onChangeText={handleChange('genre')}
                    onBlur={handleBlur('genre')}
                    fontSize={20}
                    borderColor={
                      errors.genre && touched.genre ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.genre && touched.genre && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.genre}
                      </Text>
                    )}
                  </Text>
                </FormStack>
              </FormStack>
            </FormControl>
          </View>
        )}
      </Formik>
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
              navigation.navigate('EditProfile', {id: profile.id});
            }}
          />
        </Text>
      ),
    });
  }, []);

  let testId = 2;

  const [profile, setProfile] = useState(getOneProfile(testId));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0db1ff',
        }}>
        <Image
          source={profile.picture}
          alt="Profile Picture"
          size="xl"
          defaultSource={require('./assets/profile_dummy.jpg')}
          style={{borderWidth: 2, borderColor: 'white', borderRadius: 80}}
        />
        <Heading
          width="80%"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          style={{marginTop: 30, fontSize: 28, color: 'white'}}>
          {profile.name}
        </Heading>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{width: '80%', marginTop: 10}}>
          <Heading
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
            }}>
            {'About me : '}
          </Heading>
          <Heading
            fontSize={20}
            mb={2}
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
              fontWeight: '300',
            }}>
            {profile.bio}
          </Heading>
        </Text>
        <Text style={{width: '80%', marginTop: 20}}>
          <Heading
            flex="1"
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            {'Interests : '}
          </Heading>
          <Heading
            flex="5"
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: '300',
            }}>
            {profile.genre}
          </Heading>
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          bottom: 2,
        }}>
        <Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: 'grey'}}>
            Read me 2022{'    '}
          </Text>
          <Text
            style={{fontSize: 10, textAlign: 'center', color: 'dimgrey'}}
            onPress={() => {
              Linking.openURL(
                'https://github.com/MintedKitten/ReadMe/tree/main/Documents',
              );
            }}>
            Read me of Read me GitHub Page
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const TryRemoveBook = id => {
  // Attempt to edit book history failed return false and alert, otherwise true
  console.log(id);

  return true;
};

const TryAddBook = values => {
  // Attempt to edit book history failed return false and alert, otherwise true
  return true;
};

const TryEditInformation = (id, values) => {
  // Attempt to edit book history failed return false and alert, otherwise true
  console.log(id, values);

  return true;
};

const InformationPage = ({navigation}, forceUpdate) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <Icon
            name="book-plus"
            type="material-community"
            size={20}
            color="white"
            onPress={() => {
              setToOverlay({
                id: null,
                name: '',
                author: '',
                page: '',
                summary: '',
                genre: '',
                picture: require('./assets/dummy_book.png'),
              });
              toggleOverlay();
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
  let submitted = {
    id: toOverlay.id,
    name: toOverlay.book,
    author: toOverlay.author,
    page: toOverlay.page,
    summary: toOverlay.summary,
    genre: toOverlay.genre,
    picture: toOverlay.picture,
  };
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  const getData = () => {
    setLoading(true);
    setDetails(getBookInformation());
    setLoading(false);
    forceUpdate();
  };

  const _onRefresh = () => {
    getData();
  };

  const showConfirmDialog = id => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this beautiful box?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            TryRemoveBook(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const onSubmit = () => {
    let tempChange = {
      // If any field is emtpy, the default value is used
      name: submitted.book != '' ? submitted.book : '',
      author: submitted.author != '' ? submitted.author : '',
      page: isNaN(submitted.page) ? 0 : submitted.page < 0 ? 0 : submitted.page,
      summary: submitted.summary != '' ? submitted.summary : '',
      genre: submitted.genre != '' ? submitted.genre : '',
      picture: submitted.picture,
      lastedit: new Date().toISOString(),
    };
    TryEditHistory(submitted.id, tempChange);
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
                <Column my={4}>
                  <Flex direction="row" mx={1} width="100%">
                    <Center>
                      <Image
                        source={item.picture}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                        defaultSource={require('./assets/dummy_book.png')}
                      />
                    </Center>
                    <Column mx={2} style={{width: '68%'}}>
                      <Heading>{item.name}</Heading>
                      <Text style={{fontWeight: '700'}}>
                        <Text>{'By '}</Text>
                        <Text>{item.author}</Text>
                      </Text>
                      <Text style={{fontWeight: '600'}}>
                        <Text>{item.page}</Text>
                        <Text>{' Pages'}</Text>
                      </Text>
                      <Text style={{fontWeight: '600'}}>
                        <Text>{item.genre}</Text>
                      </Text>
                      <Text>
                        <Text>{item.summary}</Text>
                      </Text>
                    </Column>
                    <Column>
                      <Flex mr={1}>
                        <Icon
                          name="more"
                          type="material"
                          onPress={() => {
                            setToOverlay(getOneBookInformation(item.id));
                            toggleOverlay();
                          }}
                        />
                        <Icon
                          name="book-off"
                          type="material-community"
                          onPress={() => {
                            if (showConfirmDialog(item.id)) {
                              forceUpdate();
                            }
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
          <View style={{width: '70%'}}>
            <Row>
              <Image
                source={toOverlay.picture}
                alt={toOverlay.name === '' ? 'No Image' : toOverlay.name}
                size="xl"
                borderRadius={10}
                defaultSource={require('./assets/dummy_book.png')}
              />
              <Column style={{marginLeft: 10}}>
                <Input
                  fontSize={20}
                  defaultValue={toOverlay.name}
                  placeholder="Book Name"
                />
                <Row>
                  <Icon
                    name="camera-reverse"
                    type="ionicon"
                    size={30}
                    color="black"
                    onPress={async () => {
                      const result = await launchImageLibrary({
                        mediaType: 'photo',
                      });
                      if (!result.didCancel) {
                        console.log(result.assets);
                      }
                    }}
                  />
                  <Spacer />
                </Row>
              </Column>
            </Row>
            <View style={{marginTop: 10}}>
              <Row>
                <Text>By : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.author}
                  placeholder="author"
                  onChangeText={author => {
                    submitted.author = author;
                  }}
                />
              </Row>
              <Row>
                <Text>Page : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.page}
                  placeholder="page"
                  onChangeText={page => {
                    submitted.page = page;
                  }}
                />
              </Row>
              <Row>
                <Flex style={{flexDirection: 'column'}}>
                  <Text>Summary : </Text>
                  <TextInput
                    multiline={true}
                    defaultValue={'' + toOverlay.summary}
                    placeholder="summary"
                    // style={{textAlignVertical: 'top'}}
                    onChangeText={summary => {
                      submitted.summary = summary;
                    }}
                  />
                </Flex>
              </Row>
              <Row>
                <Text>Genre : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.genre}
                  placeholder="genre"
                  onChangeText={genre => {
                    submitted.genre = genre;
                  }}
                />
              </Row>
            </View>
            <Row style={{flexDirection: 'row-reverse'}}>
              <Icon
                name="book-check"
                type="material-community"
                size={20}
                color="black"
                onPress={() => {
                  onSubmit();
                  toggleOverlay();
                }}
              />
            </Row>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

// id, name, author, genre, summary, picture
const testBookInformation = [
  {
    id: 1,
    name: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    page: 1216,
    summary:
      'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them',
    genre: 'Fantasy',
    picture: {
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Flotr1.jpg?alt=media&token=eb6349e5-588b-442a-8a14-2ef0e91e2eb9',
    },
    lastedit: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'The Lightning Thief',
    author: 'Rick Riordan',
    page: 377,
    summary:
      'Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena to catch a thief who has stolen the original weapon of mass destruction  Zeus’ master bolt',
    genre: 'Fantasy',
    picture: {
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fpercy_jackson_1.jpg?alt=media&token=365556f6-2519-41c6-94a4-146587500b64',
    },
    lastedit: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Dune',
    author: 'Frank Herbert',
    page: 687,
    summary:
      'Set on the desert planet Arrakis. Dune is the story of the boy Paul Atreides. heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange',
    genre: 'Science fiction',
    picture: {
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2F43419431.png?alt=media&token=99d6ab89-61a9-49e8-b17d-6e107288d830',
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
    pageread: 1216,
    rating: 4.5,
    lastedit: new Date().toISOString(),
  },
  {
    id: 2,
    bookid: 2,
    status: 'Reading',
    pageread: 152,
    rating: 4.2,
    lastedit: new Date().toISOString(),
  },
  {
    id: 3,
    bookid: 3,
    status: 'Hold',
    pageread: 125,
    rating: 2.5,
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

const TryEditHistory = (id, values) => {
  // Attempt to edit book history failed return false and alert, otherwise true
  console.log(id, values);

  return true;
};

const HistoryPage = ({navigation}, forceUpdate) => {
  useEffect(() => {
    getData();
  }, []);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toOverlay, setToOverlay] = useState({});
  let submitted = {
    status: toOverlay.status,
    pageread: toOverlay.pageread,
    rating: toOverlay.rating,
  };
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  const getData = () => {
    setLoading(true);
    setDetails(getReadingHistory());
    setLoading(false);
    forceUpdate();
  };

  const _onRefresh = () => {
    getData();
  };

  const onSubmit = () => {
    let tempChange = {
      bookid: toOverlay.bookid, // NotChanging
      status: submitted.status == '' ? 'None' : submitted.status,
      pageread: isNaN(submitted.pageread)
        ? 0
        : submitted.pageread > toOverlay.page
        ? toOverlay.page
        : submitted.pageread < 0
        ? 0
        : submitted.pageread,
      rating: isNaN(submitted.rating)
        ? 0
        : submitted.rating > 5
        ? 5
        : submitted.rating < 0
        ? 0
        : submitted.rating,
      lastedit: new Date().toISOString(),
    };
    if (TryEditHistory(toOverlay.id, tempChange)) {
      forceUpdate();
    }
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
                <Column my={4}>
                  <Flex direction="row" safeAreaTop mx={1}>
                    <Center>
                      <Image
                        source={item.picture}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                        defaultSource={require('./assets/dummy_book.png')}
                      />
                    </Center>
                    <Column mx={4} style={{justifyContent: 'space-between'}}>
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
          <View style={{width: '90%', borderRadius: 50}}>
            <Row>
              <Image
                source={toOverlay.picture}
                alt={toOverlay.name}
                size="xl"
                borderRadius={10}
                defaultSource={require('./assets/dummy_book.png')}
              />
              <Heading mx={4}>{toOverlay.name}</Heading>
            </Row>
            <View style={{marginTop: 10}}>
              <Row>
                <Text>Status : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.status}
                  placeholder="Status"
                  onChangeText={status => {
                    submitted.status = status;
                  }}
                />
              </Row>
              <Row>
                <Text>Page Read : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.pageread}
                  placeholder="0"
                  onChangeText={pageread => {
                    submitted.pageread = pageread;
                  }}
                />
                <Spacer />
                <Text
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                  }}>
                  Out of {toOverlay.page}
                </Text>
              </Row>
            </View>
            <Spacer />
            <Row style={{flexDirection: 'row'}}>
              <Text>Star : </Text>
              <Input
                variant="outline"
                p={0}
                defaultValue={'' + toOverlay.rating}
                placeholder="0-5"
                onChangeText={rating => {
                  submitted.rating = rating;
                }}
              />
            </Row>
            <Row style={{flexDirection: 'row-reverse'}}>
              <Icon
                name="book-check"
                type="material-community"
                size={20}
                color="black"
                onPress={() => {
                  onSubmit();
                  toggleOverlay();
                }}
              />
            </Row>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

const TryRegistering = value => {
  // Attempt to register if failed return false and display error, otherwise true
  console.log(JSON.stringify(value));

  return true;
};

const RegisterPage = ({navigation}) => {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Must Confirm Password'),
  });

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Heading fontSize={40} mb={2}>
          Let's get started!
        </Heading>
        <Text>Register to start your reading journey with Read me!</Text>
        <Container width="100%">
          <Box width="100%" mt={10}>
            <Formik
              //the schema
              validationSchema={validateSchema}
              //the starting value
              initialValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
              }}
              //onsubmitting the form alert, later firebase
              onSubmit={async (values, {setSubmitting}) => {
                try {
                  // To Registering Function
                  if (TryRegistering(values)) {
                    navigation.navigate('Login');
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  setSubmitting(false);
                }
              }}>
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Flex alignItems="center">
                  <FormControl>
                    <FormStack space={1} justifyContent="center">
                      <FormStack>
                        <Input
                          type="text"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Name'}
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          fontSize={20}
                          borderColor={
                            errors.name && touched.name ? 'red.600' : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.name && touched.name && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.name}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <FormStack>
                        <Input
                          type="text"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Email'}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          fontSize={20}
                          borderColor={
                            errors.email && touched.email
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.email && touched.email && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.email}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <FormStack>
                        <Input
                          type="password"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Password'}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          fontSize={20}
                          borderColor={
                            errors.password && touched.password
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.password && touched.password && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.password}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <FormStack>
                        <Input
                          type="password"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Confirm Password'}
                          value={values.passwordConfirm}
                          onChangeText={handleChange('passwordConfirm')}
                          onBlur={handleBlur('passwordConfirm')}
                          fontSize={20}
                          borderColor={
                            errors.passwordConfirm && touched.passwordConfirm
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.passwordConfirm &&
                            touched.passwordConfirm && (
                              <Text style={{color: 'red', fontSize: 15}}>
                                {errors.passwordConfirm}
                              </Text>
                            )}
                        </Text>
                      </FormStack>
                      <Button
                        block
                        large
                        disabled={isSubmitting}
                        onPress={() => {
                          handleSubmit();
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 30,
                            fontWeight: 'bold',
                          }}>
                          Register
                        </Text>
                      </Button>
                    </FormStack>
                  </FormControl>
                </Flex>
              )}
            </Formik>
          </Box>
        </Container>
      </View>
    </SafeAreaView>
  );
};

const TryGetToken = value => {
  const testtoken = {token: 'test_token'};
  AsyncStorage.setItem('@session', JSON.stringify(testtoken));
  console.log(JSON.stringify(value));

  return true;
};

const LoginPage = ({navigation}, forceUpdate) => {
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Heading fontSize={40} mb={2}>
          Read me
        </Heading>
        <Text>Login to continue your journey with Read me!</Text>
        <Container width="100%">
          <Box width="100%" mt={10}>
            <Formik
              //the schema
              validationSchema={validateSchema}
              //the starting value
              initialValues={{
                email: '',
                password: '',
              }}
              //onsubmitting the form alert, later firebase
              onSubmit={async (values, {setSubmitting}) => {
                try {
                  if (TryGetToken(values)) {
                    forceUpdate();
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  setSubmitting(false);
                }
              }}>
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Flex alignItems="center">
                  <FormControl>
                    <FormStack space={1} justifyContent="center">
                      <FormStack>
                        <Input
                          type="text"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Email'}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          fontSize={20}
                          borderColor={
                            errors.email && touched.email
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.email && touched.email && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.email}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <FormStack>
                        <Input
                          type="password"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Password'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          fontSize={20}
                          borderColor={
                            errors.password && touched.password
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.password && touched.password && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.password}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <Button
                        block
                        large
                        disabled={isSubmitting}
                        onPress={() => {
                          handleSubmit();
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 30,
                            fontWeight: 'bold',
                          }}>
                          Login
                        </Text>
                      </Button>
                    </FormStack>
                  </FormControl>
                </Flex>
              )}
            </Formik>
          </Box>
        </Container>
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
        headerStyle: {backgroundColor: '#0db1ff'},
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
        activeColor="#ffffff"
        inactiveColor="#0E185F"
        keyboardHidesNavigationBar={true}
        barStyle={{paddingBottom: 0, backgroundColor: '#0db1ff'}}>
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

const LoginNavigationStack = ({forceUpdate}) => {
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
          {({navigation}) => LoginPage({navigation}, forceUpdate)}
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

const TryLogin = token => {
  // Try get Data if failed return false, else true
  console.log(token);

  return true;
};

const NavigationComponent = () => {
  const [up, setUp] = useState(
    <LoginNavigationStack
      forceUpdate={() => {
        forceUpdate();
      }}
    />,
  );
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
    console.log('update!');
  };
  const [lock, setLock] = useState(false);
  if (!lock) {
    console.log('check nav');
    const getItem = async () => {
      return await AsyncStorage.getItem('@session');
    };
    getItem().then(value => {
      let session = JSON.parse(value);
      if (session.token.length > 0) {
        if (TryLogin(session.token)) {
          setLock(true);
          setUp(<AppNavigationTab />);
        } else {
          AsyncStorage.removeItem('@session');
        }
      }
    });
  }

  return <NativeBaseProvider>{up}</NativeBaseProvider>;
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 0);
  }, []);

  // AsyncStorage.removeItem('@session');

  const getAllKeys = async () => {
    let jsonValue;
    try {
      jsonValue = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('Error :' + e);
    }
    return jsonValue.length > 0 ? jsonValue : [];
  };

  getAllKeys().then(data => {
    if (!data.includes('@session')) {
      console.log('Setup @session token ');
      const testtoken = {token: ''};
      AsyncStorage.setItem('@session', JSON.stringify(testtoken));
    }
  });

  return <NavigationComponent />;
};

export default App;

const styles = StyleSheet.create({});
