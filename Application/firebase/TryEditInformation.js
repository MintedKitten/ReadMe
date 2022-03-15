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

const TryEditInformation = async (id, values) => {
  let token = auth().currentUser.uid;
  let fileName = 'bookPicture/' + token + '-' + values.name + '.png';
  const ref = storage().ref(fileName);
  await ref.delete().catch(error => {});
  let url = '';
  try {
    await ref.putFile(values.picture.uri);
    url = await ref.getDownloadURL();
  } catch (e) {
    url = values.picture.uri;
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
  firestore().collection('bookInfo').doc(id).set(data);
};

export default TryEditInformation;
