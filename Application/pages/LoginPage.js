import {SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Container,
  FormControl,
  Stack as FormStack,
  Input,
  Button,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TryGetToken from '../firebase/TryGetToken';

const LoginPage = ({navigation}, forceUpdate) => {
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Heading fontSize={40} mb={2}>
          Read me
        </Heading>
        <Text>Login to continue your journey with Read me!</Text>
        <Container width="100%">
          <Box width="100%" mt={10}>
            <Formik
              //the schema
              validationSchema={validateSchema}
              //the starting value
              initialValues={{
                email: '',
                password: '',
              }}
              //onsubmitting the form alert, later firebase
              onSubmit={async (values, {setSubmitting}) => {
                try {
                  TryGetToken(values);
                } catch (error) {
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
                isSubmitting,
              }) => (
                <Flex alignItems="center">
                  <FormControl>
                    <FormStack space={1} justifyContent="center">
                      <FormStack>
                        <Input
                          type="text"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Email'}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          fontSize={20}
                          borderColor={
                            errors.email && touched.email
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.email && touched.email && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.email}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <FormStack>
                        <Input
                          type="password"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Password'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          fontSize={20}
                          borderColor={
                            errors.password && touched.password
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.password && touched.password && (
                            <Text style={{color: 'red', fontSize: 15}}>
                              {errors.password}
                            </Text>
                          )}
                        </Text>
                      </FormStack>
                      <Button
                        block
                        large
                        disabled={isSubmitting}
                        onPress={() => {
                          handleSubmit();
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 30,
                            fontWeight: 'bold',
                          }}>
                          Login
                        </Text>
                      </Button>
                    </FormStack>
                  </FormControl>
                </Flex>
              )}
            </Formik>
          </Box>
        </Container>
      </View>
      <View
        style={{
          alignItems: 'center',
          bottom: 10,
        }}>
        <Text>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
            Don't have an account?
          </Text>
          {'  '}
          <Text
            style={{fontSize: 16, textAlign: 'center', color: 'black'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Register here.
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
