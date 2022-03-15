import {SafeAreaView, View, Text, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Overlay, Icon} from 'react-native-elements';
import {
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
  Input,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import TryGetReadingHistory from '../firebase/TryGetReadingHistory';
import TryEditHistory from '../firebase/TryEditHistory';
import TryGetOneReadingHistory from '../firebase/TryGetOneReadingHistory';

const HistoryPage = forceUpdate => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [toOverlay, setToOverlay] = useState({});
  let submitted = {
    status: toOverlay.status,
    pageread: toOverlay.pageread,
    rating: toOverlay.rating,
  };
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setDetails(null);
      forceUpdate();
    }, []),
  );

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    forceUpdate();
  };

  if (details == null) {
    TryGetReadingHistory(setDetails, forceUpdate);

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getData = () => {
    setLoading(true);
    setDetails(null);
    setLoading(false);
    forceUpdate();
  };

  const _onRefresh = () => {
    getData();
  };

  const onSubmit = () => {
    let tempChange = {
      book_id: toOverlay.book_id, // NotChanging
      status: submitted.status == '' ? 'None' : submitted.status,
      pageread: isNaN(submitted.pageread)
        ? 0
        : submitted.pageread > toOverlay.page
        ? toOverlay.page
        : submitted.pageread < 0
        ? 0
        : submitted.pageread,
      rating: isNaN(submitted.rating)
        ? 0
        : submitted.rating > 5
        ? 5
        : submitted.rating < 0
        ? 0
        : submitted.rating,
    };
    TryEditHistory(toOverlay.id, tempChange).then(() => {
      toggleOverlay();
      getData();
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          // data from server
          data={details}
          //Extract the key with keyExtractor
          keyExtractor={item => {
            return item.id.toString();
          }}
          // pull down to refresh
          onRefresh={() => {
            _onRefresh();
          }}
          // if refrash is true, then don't load just yet
          refreshing={loading}
          // render data
          renderItem={({item}) => (
            <Box flex="1" safeAreaTop>
              <ScrollView>
                <Column my={4}>
                  <Flex direction="row" safeAreaTop mx={1}>
                    <Center>
                      <Image
                        source={item.picture}
                        alt={item.name}
                        size="md"
                        borderRadius={10}
                        defaultSource={require('../assets/dummy_book.png')}
                      />
                    </Center>
                    <Column
                      mx={4}
                      style={{justifyContent: 'space-between', width: '65%'}}>
                      <Column>
                        <Heading>{item.name}</Heading>
                        <Text>{item.status}</Text>
                      </Column>
                      <Text>
                        <AirbnbRating
                          count={5}
                          reviews={[]}
                          reviewSize={0}
                          size={10}
                          defaultRating={item.rating}
                          isDisabled={true}
                        />
                        <Text>{'  ' + item.rating}</Text>
                      </Text>
                    </Column>
                    <Spacer />
                    <Column>
                      <Flex alignItems="flex-end" mr={1}>
                        <Icon
                          name="more"
                          type="material"
                          color="black"
                          onPress={() => {
                            setToOverlay(item);
                            toggleOverlay();
                          }}
                        />
                      </Flex>
                    </Column>
                  </Flex>
                </Column>
              </ScrollView>
            </Box>
          )}
        />
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => {
            toggleOverlay();
          }}
          overlayStyle={{
            maxHeight: Dimensions.get('window').height,
            maxWidth: Dimensions.get('window').width,
            borderRadius: 10,
          }}>
          <View style={{width: '90%'}}>
            <Row>
              <Image
                source={toOverlay.picture}
                alt={toOverlay.name === '' ? 'No Image' : toOverlay.name}
                size="xl"
                borderRadius={10}
                defaultSource={require('../assets/dummy_book.png')}
              />
              <Heading mx={4} noOfLines={3}>
                {toOverlay.name}
              </Heading>
            </Row>
            <View style={{marginTop: 10}}>
              <Row>
                <Text>Status : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.status}
                  placeholder="Status"
                  onChangeText={status => {
                    submitted.status = status;
                  }}
                />
              </Row>
              <Row>
                <Text>Page Read : </Text>
                <Input
                  variant="outline"
                  p={0}
                  defaultValue={'' + toOverlay.pageread}
                  placeholder="0"
                  onChangeText={pageread => {
                    submitted.pageread = pageread;
                  }}
                />
                <Text
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'center',
                  }}>
                  Out of {toOverlay.page}
                </Text>
              </Row>
            </View>
            <Row style={{flexDirection: 'row'}}>
              <Text>Star : </Text>
              <Input
                variant="outline"
                p={0}
                defaultValue={'' + toOverlay.rating}
                placeholder="0-5"
                onChangeText={rating => {
                  submitted.rating = rating;
                }}
              />
            </Row>
            <Row style={{flexDirection: 'row-reverse'}}>
              <Icon
                name="book-check"
                type="material-community"
                size={20}
                color="black"
                onPress={() => {
                  onSubmit();
                  toggleOverlay();
                }}
              />
            </Row>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
