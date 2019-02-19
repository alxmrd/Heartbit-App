import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { login } from "../store/actions/actions";
import { AsyncStorage } from "react-native";

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
  },
  retrieveText: {
    color: "#808080"
  }
});

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };
    //asyncStorage.setItem("token", loginData.token);
  }
  static navigationOptions = {
    header: null
  };

  componentDidUpdate(prevProps) {
    //Typical usage (don't forget to compare props):
    if (
      this.props.loginData.status !== prevProps.status &&
      this.props.loginData.status === "success"
    ) {
      this.handleSuccessLogin();
    }
  }
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  handlelogin = event => {
    event.preventDefault();

    const dataPouStelnw = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.onLogin(dataPouStelnw);
  };

  handleSuccessLogin = async () => {
    try {
      await AsyncStorage.setItem("token", this.props.loginData.token);

      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          // We have data!!
          if (token) {
            this.props.navigation.navigate("Map");
          }
        }
      } catch (error) {
        console.log("error on retrieving data");
      }
    } catch (error) {
      console.log("error");
    }
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
            <Image source={require("../images/HBlogo1.png")} />
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
              onChangeText={username => this.setState({ username })}
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
            onPress={this.handlelogin}
          >
            <Text style={styles.loginText}>Σύνδεση</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.onClickListener("restore_password")}
          >
            <Text style={styles.retrieveText}>
              Ξεχάσατε τον κωδικό σας; Επαναφορά
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginData: state.loginData
});
const mapDispatchToProps = dispatch => ({
  onLogin: dataPouStelnw => login(dispatch, dataPouStelnw)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
