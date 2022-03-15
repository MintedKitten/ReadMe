import {SafeAreaView, View, Text, Alert} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {Icon} from 'react-native-elements';
import {
  Row,
  Image,
  FormControl,
  Stack as FormStack,
  Input,
  TextArea,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import TryEditProfile from '../firebase/TryEditProfile';
import TryGetOneProfile from '../firebase/TryGetOneProfile';

const EditProfilePage = ({navigation, route}, forceUpdate) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text>
          <Icon
            name="checklist"
            type="octicon"
            size={20}
            color="white"
            onPress={() => {
              TryEditProfile(tempProfile)
                .then(() => {
                  route.params.setprofile(null);
                  navigation.navigate('Profile');
                })
                .catch(err => {
                  Alert.alert('Error saving profile please try again');
                  navigation.navigate('Profile');
                });
            }}
          />
        </Text>
      ),
    });
  }, []);

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    genre: Yup.string(),
    bio: Yup.string(),
    picture: Yup.mixed(),
  });

  const [profile, setProfile] = useState(null);

  if (profile == null) {
    TryGetOneProfile(setProfile, forceUpdate);
    return null;
  }

  const onSubmit = value => {
    tempProfile = {
      id: profile.id,
      acc_id: profile.acc_id,
      name: value.name,
      genre: value.genre,
      bio: value.bio,
      picture: value.picture,
    };
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Formik
        validateSchema={validateSchema}
        //the starting value
        initialValues={{
          name: profile.name,
          genre: profile.genre,
          bio: profile.bio,
          picture: profile.picture,
        }}
        //onsubmitting the form alert, later firebase
        onSubmit={async (values, {setSubmitting}) => {
          try {
            onSubmit(values);
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Row>
              <Image
                source={values.picture}
                alt="Profile Picture"
                size="xl"
                borderRadius={10}
                defaultSource={require('../assets/dummy_book.png')}
                style={{borderRadius: 80}}
              />
              <Icon
                name="camera-reverse"
                type="ionicon"
                size={30}
                color="black"
                style={{marginLeft: 10}}
                onPress={async () => {
                  const result = await launchImageLibrary({mediaType: 'photo'});
                  if (!result.didCancel) {
                    values.picture = {uri: result.assets[0].uri};
                    handleSubmit();
                    forceUpdate();
                  }
                }}
              />
            </Row>
            <FormControl>
              <FormStack space={1} justifyContent="center" ml={2} mr={2} mt={5}>
                <FormStack>
                  <Input
                    width="100%"
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Name'}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    fontSize={20}
                    borderColor={
                      errors.name && touched.name ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.name && touched.name && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.name}
                      </Text>
                    )}
                  </Text>
                </FormStack>
                <FormStack>
                  <TextArea
                    width="100%"
                    numberOfLines={3}
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Bio'}
                    value={values.bio}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    fontSize={20}
                    borderColor={
                      errors.bio && touched.bio ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.bio && touched.bio && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.bio}
                      </Text>
                    )}
                  </Text>
                </FormStack>
                <FormStack>
                  <TextArea
                    width="100%"
                    numberOfLines={3}
                    type="text"
                    variant="outline"
                    pt={3}
                    pl={5}
                    pb={3}
                    placeholder={'Genre'}
                    value={values.genre}
                    onChangeText={handleChange('genre')}
                    onBlur={handleBlur('genre')}
                    fontSize={20}
                    borderColor={
                      errors.genre && touched.genre ? 'red.600' : 'gray.300'
                    }
                    onChange={() => {
                      handleSubmit();
                    }}
                  />
                  <Text>
                    {errors.genre && touched.genre && (
                      <Text style={{color: 'red', fontSize: 15}}>
                        {errors.genre}
                      </Text>
                    )}
                  </Text>
                </FormStack>
              </FormStack>
            </FormControl>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditProfilePage;
