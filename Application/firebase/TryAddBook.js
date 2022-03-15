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

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryAddBook = async values => {
  let fileName = 'bookPicture/' + values.acc_id + '/' + values.name + '.png';
  const ref = storage().ref(fileName);
  await ref.delete().catch(error => {});
  await ref.putFile(values.picture.uri);
  const url = await ref.getDownloadURL();
  data = {
    acc_id: values.acc_id,
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
      historydata = {
        book_id: value.id,
        acc_id: values.acc_id,
        status: '',
        pageread: 0,
        rating: 0,
        lastedit: new Date().toISOString(),
      };
      firestore().collection('readingHistory').add(historydata);
    });
};

export default TryAddBook;
