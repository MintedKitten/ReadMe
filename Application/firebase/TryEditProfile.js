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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryEditProfile = async profile => {
  // Attempt to edit book history failed return false and alert, otherwise true
  let fileName = 'profilePicture/' + profile.acc_id + '.png';
  const ref = storage().ref(fileName);
  await ref.delete().catch(error => {});
  await ref.putFile(profile.picture.uri);
  const url = await ref.getDownloadURL();
  data = {
    acc_id: profile.acc_id,
    name: profile.name,
    bio: profile.bio,
    genre: profile.genre,
    picture: {uri: url},
  };
  firestore().collection('userInfo').doc(profile.id).set(data);
};

export default TryEditProfile;
