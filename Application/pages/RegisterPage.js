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
import TryRegistering from '../firebase/TryRegistering';

const RegisterPage = ({navigation}) => {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Must Confirm Password'),
  });

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Heading fontSize={40} mb={2}>
          Let's get started!
        </Heading>
        <Text>Register to start your reading journey with Read me!</Text>
        <Container width="100%">
          <Box width="100%" mt={10}>
            <Formik
              //the schema
              validationSchema={validateSchema}
              //the starting value
              initialValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
              }}
              //onsubmitting the form alert, later firebase
              onSubmit={async (values, {setSubmitting}) => {
                try {
                  // To Registering Function
                  TryRegistering(values);
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
                          placeholder={'Name'}
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          fontSize={20}
                          borderColor={
                            errors.name && touched.name ? 'red.600' : 'gray.300'
                          }
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
                          value={values.password}
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
                      <FormStack>
                        <Input
                          type="password"
                          variant="outline"
                          pt={3}
                          pl={5}
                          pb={3}
                          placeholder={'Confirm Password'}
                          value={values.passwordConfirm}
                          onChangeText={handleChange('passwordConfirm')}
                          onBlur={handleBlur('passwordConfirm')}
                          fontSize={20}
                          borderColor={
                            errors.passwordConfirm && touched.passwordConfirm
                              ? 'red.600'
                              : 'gray.300'
                          }
                        />
                        <Text>
                          {errors.passwordConfirm &&
                            touched.passwordConfirm && (
                              <Text style={{color: 'red', fontSize: 15}}>
                                {errors.passwordConfirm}
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
                          Register
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
    </SafeAreaView>
  );
};

export default RegisterPage;
