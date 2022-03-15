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

const TryGetOneProfile = (setProfile, forceUpdate) => {
  auth()
    .currentUser.getIdToken()
    .then(token => {
      firestore()
        .collection('userInfo')
        .where('acc_id', '==', token)
        .get()
        .then(prof => {
          if (!prof.empty) {
            let data = prof.docs[0];
            setProfile({
              id: data.id,
              acc_id: data.get('acc_id'),
              name: data.get('name'),
              genre: data.get('genre'),
              bio: data.get('bio'),
              picture: data.get('picture'),
            });
            forceUpdate();
          }
        });
    });
};

export default TryGetOneProfile;
