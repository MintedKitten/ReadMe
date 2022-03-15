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
import TryGetBookInformation from './TryGetBookInformation';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryGetReadingHistory = () => {
  // id, bookid, status, pageread, rating
  // const testHistory = [
  //   {
  //     id: 1,
  //     bookid: 1,
  //     acc_id: 'test_token',
  //     status: 'Complete',
  //     pageread: 1216,
  //     rating: 4.5,
  //     lastedit: new Date().toISOString(),
  //   },
  //   {
  //     id: 2,
  //     bookid: 2,
  //     acc_id: 'test_token',
  //     status: 'Reading',
  //     pageread: 152,
  //     rating: 4.2,
  //     lastedit: new Date().toISOString(),
  //   },
  //   {
  //     id: 3,
  //     bookid: 3,
  //     acc_id: 'test_token',
  //     status: 'Hold',
  //     pageread: 125,
  //     rating: 2.5,
  //     lastedit: new Date().toISOString(),
  //   },
  // ];
  // let tempHistory = [];
  // testHistory.forEach(element => {
  //   let info = TryGetBookInformation().find(book => book.id === element.bookid);
  //   console.log(info);
  //   tempHistory.push({
  //     id: element.id,
  //     name: info.name,
  //     page: info.page,
  //     bookid: element.id,
  //     status: element.status,
  //     pageread: element.pageread,
  //     rating: element.rating,
  //     picture: info.picture,
  //   });
  // });
  return [];
};

export default TryGetReadingHistory;
