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

const TryLogin = token => {

  return true;
};

export default TryLogin;
