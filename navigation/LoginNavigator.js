import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import Login from "../screens/Login";

export default (LoginStack = createStackNavigator({
  Login: Login
}));
