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

const Stack =
  require('@react-navigation/native-stack').createNativeStackNavigator();
const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const TryGetToken = value => {
  // const testtoken = {token: 'test_token'};
  // AsyncStorage.setItem('@session', JSON.stringify(testtoken));
  auth()
    .signInWithEmailAndPassword(value.email, value.password)
    .then(() => {
      console.log(value.email + ': Login Success');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('User not found. Please, try again');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password. Please try again');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email. Please try again');
      } else {
        Alert.alert(error.message);
      }
    });
  console.log(value);

  // return true;
};

export default TryGetToken;
