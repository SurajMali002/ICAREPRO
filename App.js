///working

import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import loginScreen from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import MedicineScreen from './Screens/Medicine';
import MyOrders from './Screens/MyOrders';
import MyOrderDetails from './Screens/MyOrdersDetails';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomSideBarMenu from './CustomSideBarMenu';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import SettingScreen from './Screens/Setting';
import LoadingScreen from './Screens/Loading'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default function App() {
  return <AppContainer />;
}

const MyOrderStackNavigator = createStackNavigator({
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      headerShown: false,
    },
  },
  MyOrderDetails: {
    screen: MyOrderDetails,
    navigationOptions: {
      headerTitle: 'Order Details',
    },
  },
});

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppTabNavigator = createBottomTabNavigator({
  StackNavigator: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('./download.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel: 'Home',
    },
  },
  MyOrders: {
    screen: MyOrderStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('./myOrders.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel: 'MyOrders',
    },
  },
  Medicine: {
    screen: MedicineScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('./medicine.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel: 'Medicine',
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('./532562.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel: 'Setting',
    },
  },
});
const SwitchNavigator = createSwitchNavigator({
  loginScreen: { screen: loginScreen },
  AppTabNavigator: { screen: AppTabNavigator },
  Signup: { screen: Signup },
  
  
});

const AppContainer = createAppContainer(SwitchNavigator);
