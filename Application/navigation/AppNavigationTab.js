import React, {useState} from 'react';
import {NavigationContainer as NavCon} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import HistoryStack from './HistoryStack';
import InformationStack from './InformationStack';
import ProfileStack from './ProfileStack';

const Tab =
  require('@react-navigation/material-bottom-tabs').createMaterialBottomTabNavigator();

const AppNavigationTab = () => {
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  return (
    <NavCon>
      <Tab.Navigator
        initialRouteName="HistoryStack"
        backBehavior="none"
        shifting={true}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let size = 20;
            let iconName = (
              <Icon
                type="material-community"
                name="progress-question"
                size={size}
                color={color}
              />
            );
            if (route.name === 'HistoryStack') {
              iconName = focused ? (
                <Icon type="ionicon" name="book" size={size} color={color} />
              ) : (
                <Icon type="feather" name="book" size={size} color={color} />
              );
            } else if (route.name === 'InformationStack') {
              iconName = focused ? (
                <Icon
                  type="material"
                  name="menu-book"
                  size={size}
                  color={color}
                />
              ) : (
                <Icon
                  type="material-community"
                  name="bookshelf"
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? (
                <Icon type="ionicon" name="person" size={size} color={color} />
              ) : (
                <Icon
                  type="ionicon"
                  name="person-outline"
                  size={size}
                  color={color}
                />
              );
            }
            return iconName;
          },
        })}
        activeColor="#ffffff"
        inactiveColor="#0E185F"
        keyboardHidesNavigationBar={true}
        barStyle={{paddingBottom: 0, backgroundColor: '#0db1ff'}}>
        <Tab.Screen
          name="HistoryStack"
          options={{
            tabBarLabel: 'History',
            title: 'Book History',
          }}>
          {() => HistoryStack(forceUpdate)}
        </Tab.Screen>
        <Tab.Screen
          name="InformationStack"
          options={{
            tabBarLabel: 'Information',
            title: 'Book Information',
          }}>
          {() => InformationStack(forceUpdate)}
        </Tab.Screen>
        <Tab.Screen
          name="ProfileStack"
          options={{
            tabBarLabel: 'Profile',
            title: 'Your Profile',
          }}>
          {() => ProfileStack(forceUpdate)}
        </Tab.Screen>
      </Tab.Navigator>
    </NavCon>
  );
};

export default AppNavigationTab;
