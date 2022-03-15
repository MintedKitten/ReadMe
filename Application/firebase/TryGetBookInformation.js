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

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryGetBookInformation = () => {
  // id, name, author, genre, summary, picture
  // const testBookInformation = [
  //   {
  //     id: 1,
  //     acc_id: 'test_token',
  //     name: 'The Lord of the Rings',
  //     author: 'J.R.R. Tolkien',
  //     page: 1216,
  //     summary:
  //       'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them',
  //     genre: 'Fantasy',
  //     picture: {
  //       uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Flotr1.jpg?alt=media&token=eb6349e5-588b-442a-8a14-2ef0e91e2eb9',
  //     },
  //     lastedit: new Date().toISOString(),
  //   },
  //   {
  //     id: 2,
  //     acc_id: 'test_token',
  //     name: 'The Lightning Thief',
  //     author: 'Rick Riordan',
  //     page: 377,
  //     summary:
  //       'Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena to catch a thief who has stolen the original weapon of mass destruction  Zeus’ master bolt',
  //     genre: 'Fantasy',
  //     picture: {
  //       uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fpercy_jackson_1.jpg?alt=media&token=365556f6-2519-41c6-94a4-146587500b64',
  //     },
  //     lastedit: new Date().toISOString(),
  //   },
  //   {
  //     id: 3,
  //     acc_id: 'test_token',
  //     name: 'Dune',
  //     author: 'Frank Herbert',
  //     page: 687,
  //     summary:
  //       'Set on the desert planet Arrakis. Dune is the story of the boy Paul Atreides. heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange',
  //     genre: 'Science fiction',
  //     picture: {
  //       uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2F43419431.png?alt=media&token=99d6ab89-61a9-49e8-b17d-6e107288d830',
  //     },
  //     lastedit: new Date().toISOString(),
  //   },
  // ];

  return [];
};

export default TryGetBookInformation;
