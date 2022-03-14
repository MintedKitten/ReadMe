// Invoke-Expression (((ConvertFrom-StringData (Get-Content .\android\local.properties -raw)).'sdk.dir')+'\emulator\emulator.exe -avd Pixel_3_API_29')
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Linking,
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
    picture: {
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book_v1.png?alt=media&token=9a331dec-d288-4e4d-83a6-4729f6829f84',
    },
  },
  {
    id: 2,
    name: 'Tim Dolly',
    genre: 'Romance, Walking on the beach, and Science',
    bio: 'Having a lovely',
    picture: {
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book_v2.png?alt=media&token=d4832dd3-1a3e-45fa-b2ca-6bbe66cbda5b',
    },
  },
];

const getOneProfile = id => {
  return testProfile.find(profile => profile.id === id);
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
              alert(JSON.stringify(submitted)); // To Change Profile Function
              navigation.navigate('Profile');
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
  let submitted = {};

  const onSubmit = value => {
    submitted = value;
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Formik
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
              />
              <Icon
                name="camera-reverse"
                type="ionicon"
                size={30}
                color="black"
                style={{marginLeft: 10}}
                onPress={() => {
                  alert('change picture'); // To Image Picker
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

  let testId = 1;

  const [profile, setProfile] = useState(getOneProfile(testId));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={profile.picture}
          alt="Profile Picture"
          size="xl"
          borderRadius={10}
          defaultSource={require('./assets/dummy_book.png')}
        />
        <Heading
          width="80%"
          fontSize={40}
          mb={2}
          fontWeight="extrabold"
          textAlign="center">
          {profile.name}
        </Heading>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text style={{width: '80%', marginTop: 10}}>
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
            {'Genre : '}
          </Heading>
          <Heading
            flex="5"
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            {profile.genre}
          </Heading>
        </Text>
        <Text style={{width: '80%', marginTop: 10}}>
          <Heading
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
            }}>
            {'Bio : '}
          </Heading>
          <Heading
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
            }}>
            {profile.bio}
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
              alert('search'); //
            }}
          />
          {'   '}
          <Icon
            name="heart"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('hey'); //
            }}
          />
          {'   '}
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
          {'   '}
          <Icon
            name="book-remove"
            type="material-community"
            size={20}
            color="white"
            onPress={() => {
              setIsRemoving(!isRemoving);
              forceUpdate();
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
  const [isRemoving, setIsRemoving] = useState(false);

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

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this beautiful box?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
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

  const removeBookIcon = item => {
    return (
      <Icon
        name="book-off"
        type="material-community"
        onPress={() => {
          setToOverlay(getOneBookInformation(item.id));
          toggleOverlay();
        }}
      />
    );
  };

  const editBookIcon = item => {
    return (
      <Icon
        name="more"
        type="material"
        onPress={() => {
          setToOverlay(getOneBookInformation(item.id));
          toggleOverlay();
        }}
      />
    );
  };

  const onSubmit = () => {
    let tempChange = {
      // If any field is emtpy, the default value is used
      id: submitted.id, // Will later be split
      name: submitted.book,
      author: submitted.author,
      page: isNaN(submitted.page) ? 0 : submitted.page < 0 ? 0 : submitted.page,
      summary: submitted.summary,
      genre: submitted.genre,
      picture: submitted.picture,
      lastedit: new Date().toISOString(),
    };
    alert(JSON.stringify(tempChange)); // To change Book Information
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
                        source={item.picture}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                        defaultSource={require('./assets/dummy_book.png')}
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
          <View style={{width: '90%', borderRadius: 50}}>
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
                    onPress={() => {
                      alert('select picture'); // To Select Image Picker
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
                <Text>Summary : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.summary}
                  placeholder="summary"
                  onChangeText={summary => {
                    submitted.summary = summary;
                  }}
                />
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
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book_v1.png?alt=media&token=9a331dec-d288-4e4d-83a6-4729f6829f84',
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
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book_v2.png?alt=media&token=d4832dd3-1a3e-45fa-b2ca-6bbe66cbda5b',
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
      uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book_v3.png?alt=media&token=cfc44a44-36b7-43d4-a210-b3489c02747b',
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
              alert('search'); //
            }}
          />
          {'   '}
          <Icon
            name="bookmark"
            type="ionicon"
            size={20}
            color="white"
            onPress={() => {
              alert('favorite'); //
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

  const getData = async () => {
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
      id: toOverlay.id, // Will later be split
      bookid: toOverlay.bookid, // NotChanging
      status: submitted.status == '' ? 'None' : submitted.status,
      pageread:
        submitted.pageread > toOverlay.page
          ? toOverlay.page
          : submitted.pageread < 0
          ? 0
          : submitted.pageread,
      rating:
        submitted.rating > 5 ? 5 : submitted.rating < 0 ? 0 : submitted.rating,
      lastedit: new Date().toISOString(),
    };
    alert(JSON.stringify(tempChange)); // To Edit history Function
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
                        source={item.picture}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                        defaultSource={require('./assets/dummy_book.png')}
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
                  alert(JSON.stringify(values)); // To Registering Function
                  navigation.navigate('Login');
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

const LoginPage = ({navigation}) => {
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
                  alert(JSON.stringify(values)); // To Login Function
                  navigation.navigate('Login');
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
        barStyle={{paddingBottom: 0, backgroundColor: '#2FA4FF'}}>
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
  const [session, setSession] = useState('test_token');

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
