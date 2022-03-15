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
  TextArea,
} from 'native-base';
import {AirbnbRating} from 'react-native-ratings';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryAddBook = async (values) => {
  let token = auth().currentUser.uid;
  let fileName = 'bookPicture/' + token + '-' + values.name + '.png';
  const ref = storage().ref(fileName);
  await ref.delete().catch(error => {});
  let url = '';
  if (
    values.picture.uri ==
    'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book.png?alt=media&token=72b2f2c2-7cb9-4c59-9b4f-0c859d103bae'
  ) {
    url =
      'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fdummy_book.png?alt=media&token=72b2f2c2-7cb9-4c59-9b4f-0c859d103bae';
  } else {
    await ref.putFile(values.picture.uri);
    url = await ref.getDownloadURL();
  }
  let data = {
    acc_id: token,
    name: values.name,
    author: values.author,
    page: values.page,
    summary: values.summary,
    genre: values.genre,
    picture: {uri: url},
    lastedit: new Date().toISOString(),
  };
  firestore()
    .collection('bookInfo')
    .add(data)
    .then(async value => {
      let historydata = {
        book_id: value.id,
        acc_id: token,
        status: '',
        pageread: 0,
        rating: 0,
        lastedit: data.lastedit,
      };
      firestore().collection('readingHistory').add(historydata);
    });
};

export default TryAddBook;
