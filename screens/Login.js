import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo";
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: ""
    };
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#46929a", "#68a89a", "#94bd9a", "#c5cea1", "#f5deb3"]}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5
          }}
        >
          <View>
            <Image source={require("../images/HeartBitLogo.png")} />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/user/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Όνομα Χρήστη"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Kωδικός"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onClickListener("login")}
          >
            <Text style={styles.loginText}>Σύνδεση</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.onClickListener("restore_password")}
          >
            <Text>Ξεχάσατε τον κωδικό σας? Επαναφορά</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#008081"
  },
  loginText: {
    color: "white"
  }
});
