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
import TryGetOneBookInformation from '../firebase/TryGetOneBookInformation';

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
                picture: require('../assets/dummy_book.png'),
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
    setDetails(TryGetBookInformation());
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
    };
    if (submitted.id != null) {
      TryEditInformation(submitted.id, tempChange)
        getData();
    } else {
      TryAddBook(tempChange)
        getData();
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
              <Text></Text>
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
                          onPress={() => {
                            setToOverlay(TryGetOneBookInformation(item.id));
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
                source={toOverlay.picture}
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
                      defaultValue={toOverlay.name}
                      placeholder="Book Name"
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
                          console.log(result.assets); //change pic and reload
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
                    defaultValue={toOverlay.summary}
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
                  defaultValue={toOverlay.genre}
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
