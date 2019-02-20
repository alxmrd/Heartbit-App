import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Προφίλ",

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

const MapStack = createStackNavigator({
  Map: MapScreen
});
MapStack.navigationOptions = {
  tabBarLabel: "Xάρτες",

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Ιστορικό",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-time" : "md-time"}
    />
  )
};

export default createBottomTabNavigator({
  ProfileStack,
  MapStack,
  SettingsStack
});
