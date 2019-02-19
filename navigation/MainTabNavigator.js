import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/AntDesign";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Login from "../screens/Login";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const MapStack = createStackNavigator({
  Map: MapScreen
});
MapStack.navigationOptions = {
  tabBarLabel: "Maps",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
const LoginStack = createStackNavigator({
  Login: Login
});

LoginStack.navigationOptions = {
  tabBarLabel: "Σύνδεση",
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={Platform.OS === "ios" ? "login" : "md-options"}
      size={20}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  SettingsStack,
  LoginStack
});
