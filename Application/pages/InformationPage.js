import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Linking,
  Alert,
  TextInput,
  Dimensions,
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
  TextArea,
} from 'native-base';
import {AirbnbRating} from 'react-native-ratings';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import TryGetBookInformation from '../firebase/TryGetBookInformation';
import TryRemoveBook from '../firebase/TryRemoveBook';
import TryEditInformation from '../firebase/TryEditInformation';
import TryAddBook from '../firebase/TryAddBook';

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
                picture: {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book.png?alt=media&token=72b2f2c2-7cb9-4c59-9b4f-0c859d103bae',
                },
              });
              toggleOverlay();
            }}
          />
        </Text>
      ),
    });
  }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toOverlay, setToOverlay] = useState({});
  let submitted = {
    id: toOverlay.id,
    name: toOverlay.name,
    author: toOverlay.author,
    page: toOverlay.page,
    summary: toOverlay.summary,
    genre: toOverlay.genre,
    picture: toOverlay.picture,
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  if (details == null) {
    TryGetBookInformation(setDetails, forceUpdate);

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getData = () => {
    setLoading(true);
    setDetails(null);
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
      name: submitted.name != '' ? submitted.name : '',
      author: submitted.author != '' ? submitted.author : '',
      page: isNaN(submitted.page) ? 0 : submitted.page < 0 ? 0 : submitted.page,
      summary: submitted.summary != '' ? submitted.summary : '',
      genre: submitted.genre != '' ? submitted.genre : '',
      picture: submitted.picture,
    };
    if (submitted.id != null) {
      TryEditInformation(submitted.id, tempChange).then(() => {
        toggleOverlay();
        getData();
      });
    } else {
      TryAddBook(tempChange).then(() => {
        toggleOverlay();
        getData();
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          // data from server
          data={details}
          //Extract the key with keyExtractor
          keyExtractor={item => {
            return item.id.toString();
          }}
          // pull down to refresh
          onRefresh={() => {
            _onRefresh();
          }}
          // if refrash is true, then don't load just yet
          refreshing={loading}
          // render data
          renderItem={({item}) => (
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
                        defaultSource={require('../assets/dummy_book.png')}
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
                          onPress={async () => {
                            setToOverlay(item);
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
          <View style={{width: '90%'}}>
            <Row>
              <Image
                source={submitted.picture}
                alt="Book Image"
                size="xl"
                borderRadius={10}
                defaultSource={require('../assets/dummy_book.png')}
              />
              <Row style={{marginLeft: 10}}>
                <Column>
                  <Flex style={{flexDirection: 'column'}}>
                    <Input
                      fontSize={20}
                      defaultValue={submitted.name}
                      placeholder="Book Name"
                      onChangeText={name => {
                        submitted.name = name;
                      }}
                    />
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
                          let tempChange = {
                            id: submitted.id,
                            name: submitted.name,
                            author: submitted.author,
                            page: submitted.page,
                            summary: submitted.summary,
                            genre: submitted.genre,
                            picture: {uri: result.assets[0].uri},
                          };
                          setToOverlay(tempChange);
                          forceUpdate();
                        }
                      }}
                    />
                  </Flex>
                </Column>
              </Row>
            </Row>
            <View style={{marginTop: 10}}>
              <Row>
                <Text>By : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={submitted.author}
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
                  defaultValue={submitted.page}
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
                    defaultValue={submitted.summary}
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
                  defaultValue={submitted.genre}
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
                }}
              />
            </Row>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

export default InformationPage;
