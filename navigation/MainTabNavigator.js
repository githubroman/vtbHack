import React from 'react';
import { Platform, Text, StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import IdetifierScreen from '../screens/IdetifierScreen';
import EventsScreen from '../screens/EventsScreen';
import AddEventScreen from '../screens/AddEventScreen';
import EventScreen from '../screens/EventScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{ props.title }</Text>
    </View>
  )
}

const EventsStack = createStackNavigator(
  {
    Idetifier: IdetifierScreen,
    Events: EventsScreen,
    AddEvent: AddEventScreen,
    Event: EventScreen,
  },
  {
    initialRouteName: 'Idetifier',
    defaultNavigationOptions: {
      header: <Header title="События"/>
    },
  }
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

EventsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  EventsStack,
  SettingsStack,
});

tabNavigator.path = '';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#5759FF',
    height: 56,
    padding: 14,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
    color: '#FFFFFF',
    fontWeight: 'normal'
  }
});

export default EventsStack;
