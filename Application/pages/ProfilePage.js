import {SafeAreaView, View, Text, Linking} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {Icon} from 'react-native-elements';
import {Image, Heading} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TryGetOneProfile from '../firebase/TryGetOneProfile';

const ProfilePage = ({navigation}, forceUpdate) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <Icon
            name="pencil"
            type="material-community"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </Text>
      ),
    });
  }, []);

  const [profile, setProfile] = useState(null);

  if (profile == null) {
    TryGetOneProfile(setProfile, forceUpdate);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            bottom: 2,
          }}>
          <Text>
            <Text style={{fontSize: 10, textAlign: 'center', color: 'grey'}}>
              Read me 2022{'    '}
            </Text>
            <Text
              style={{fontSize: 10, textAlign: 'center', color: 'dimgrey'}}
              onPress={() => {
                Linking.openURL(
                  'https://github.com/MintedKitten/ReadMe/tree/main/Documents',
                );
              }}>
              Read me of Read me GitHub Page
            </Text>
            <Text
              style={{fontSize: 10, textAlign: 'center', color: 'dimgrey'}}
              onPress={() => {
                auth().signOut();
              }}>
              {'  '}Log out
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0db1ff',
        }}>
        <Image
          source={profile.picture}
          alt="Profile Picture"
          size="xl"
          defaultSource={require('../assets/profile_dummy.jpg')}
          style={{borderWidth: 2, borderColor: 'white', borderRadius: 80}}
        />
        <Heading
          width="80%"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          style={{marginTop: 30, fontSize: 28, color: 'white'}}>
          {profile.name}
        </Heading>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{width: '80%', marginTop: 10}}>
          <Heading
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
            }}>
            {'About me : '}
          </Heading>
          <Heading
            fontSize={20}
            mb={2}
            style={{
              justifyContent: 'center',
              textAlign: 'justify',
              fontWeight: '300',
            }}>
            {profile.bio}
          </Heading>
        </Text>
        <Text style={{width: '80%', marginTop: 20}}>
          <Heading
            flex="1"
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            {'Interests : '}
          </Heading>
          <Heading
            flex="5"
            fontSize={20}
            mb={2}
            fontWeight="medium"
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: '300',
            }}>
            {profile.genre}
          </Heading>
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          bottom: 2,
        }}>
        <Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: 'grey'}}>
            Read me 2022{'    '}
          </Text>
          <Text
            style={{fontSize: 10, textAlign: 'center', color: 'dimgrey'}}
            onPress={() => {
              Linking.openURL(
                'https://github.com/MintedKitten/ReadMe/tree/main/Documents',
              );
            }}>
            Read me of Read me GitHub Page
          </Text>
          <Text
            style={{fontSize: 10, textAlign: 'center', color: 'dimgrey'}}
            onPress={() => {
              auth().signOut();
            }}>
            {'  '}Log out
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
