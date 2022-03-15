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
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryGetReadingHistory = async (callBack, forceUpdate) => {
  let token = auth().currentUser.uid;
  firestore()
    .collection('bookInfo')
    .where('acc_id', '==', token)
    .get()
    .then(qSnapshot => {
      let bookInfo = [];
      for (let index = 0; index < qSnapshot.docs.length; index++) {
        const doc = qSnapshot.docs[index];
        bookInfo.push({
          id: doc.id,
          acc_id: doc.get('acc_id'),
          name: doc.get('name'),
          author: doc.get('author'),
          page: doc.get('page'),
          summary: doc.get('summary'),
          genre: doc.get('genre'),
          picture: doc.get('picture'),
        });
      }
      firestore()
        .collection('readingHistory')
        .where('acc_id', '==', token)
        .get()
        .then(qSnapshot => {
          let history = [];
          for (let index = 0; index < qSnapshot.docs.length; index++) {
            const doc = qSnapshot.docs[index];
            history.push({
              id: doc.id,
              name: bookInfo[index].name,
              page: bookInfo[index].page,
              book_id: doc.get('book_id'),
              status: doc.get('status'),
              pageread: doc.get('pageread'),
              rating: doc.get('rating'),
              picture: bookInfo[index].picture,
            });
          }
          callBack(history);
          forceUpdate();
        });
    });
};

export default TryGetReadingHistory;
