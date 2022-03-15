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

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryRegistering = value => {
  // Attempt to register if failed return false and display error, otherwise true
  auth()
    .createUserWithEmailAndPassword(value.email, value.password)
    .then(async () => {
      auth().currentUser.updateProfile({
        displayName: null,
        photoURL: null,
      });
      const profile = {
        acc_id: await auth().currentUser.getIdToken(),
        name: value.name,
        bio: 'Love surfing',
        genre: 'Action',
        picture: {
          uri: 'https://firebasestorage.googleapis.com/v0/b/readme-444f4.appspot.com/o/assets%2Fprofile_dummy.jpg?alt=media&token=257e7962-f1ac-449a-a97c-4d4448af9f2a',
        },
      };
      firestore()
        .collection('userInfo')
        .add(profile)
        .then(() => {
          console.log('new profile created!');
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already in use. Please, try another one or Login');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password is too weak. Please try again');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email. Please try again');
      } else {
        Alert.alert(error.message);
      }
    });

  console.log(value);

  // return true;
};

export default TryRegistering;
