import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MapView } from "expo";
import { Button } from "react-native-elements";
import Pusher from "pusher-js/react-native";
import getDirections from "react-native-google-maps-directions";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import AnimatedHideView from "react-native-animated-hide-view";
import {
  fetchDefifrillators,
  messageReceive,
  messageClean,
  logout,
  clearLoginData,
  eventReceive,
  eventClean,
  eventReject
} from "../store/actions/actions";

import SnackBar from "react-native-snackbar-component";

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {},
      redirect: false,

      closeSnackBar: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Χάρτης",
      headerStyle: {
        backgroundColor: "teal"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontFamily: "space-mono"
      },

      headerRight: (
        <Button
          onPress={navigation.getParam("logout")}
          title="Αποσύνδεση"
          type="clear"
          titleStyle={{ fontSize: 14, color: "#fff", fontFamily: "space-mono" }}
          icon={<Icon name="sign-out" size={15} color="white" />}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    this._getStorageValue();
    Pusher.logToConsole = true;

    var pusher = new Pusher("2f7f2a748cacde676705", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("channel");
    channel.bind("event", data => {
      this.props.onMessageReceive(data.message);
    });
    var channel = pusher.subscribe("channel");
    channel.bind("peristatiko", data => {
      this.setState({ closeSnackBar: true });

      this.props.onEventReceive(data);
    });
  }

  async _getStorageValue() {
    const token = await AsyncStorage.getItem("token");
    if (token == null) {
      this.props.navigation.navigate("Login");
    }
    this.props.onfetchDefifrillators();
  }

  _logout = async () => {
    try {
      const token = await AsyncStorage.removeItem("token");
      const username = await AsyncStorage.removeItem("username");
      if (token == null && username == null) {
        this.props.navigation.navigate("Login");
        this.props.onLogout(this.props.userData);
        this.props.onClear(this.props.loginData);
      }
    } catch (error) {
      console.log("error on removing data");
    }
  };

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.props.currentLocation.latitude,
        longitude: this.props.currentLocation.longitude
      },

      destination: {
        latitude: this.props.event.latitude,
        longitude: this.props.event.longitude
      },

      params: [
        {
          key: "travelmode",
          value: "walking" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "waypoints",
          value: this.props.nearestDefibrillator.location // may be "walking", "bicycling" or "transit" as well
        },

        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
    this.setState({ closeSnackBar: false });
  };
  handleRejection = () => {
    this.setState({ closeSnackBar: false });
    this.props.onEventClean(this.props.event);
    this.props.onEventReject();
  };

  render() {
    const {
      defibrillators,
      message,
      event,
      addressOfEvent,
      eventAnswer
    } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.currentLocation.latitude
              ? this.props.currentLocation.latitude
              : 40.30069,
            longitude: this.props.currentLocation.longitude
              ? this.props.currentLocation.longitude
              : 21.78896,
            latitudeDelta: 0.001,
            longitudeDelta: 0.02
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 40.30069, longitude: 21.78896 }}
            title={"Koζάνη"}
            //description={"desss"}
          />
          {this.props.currentLocation ? (
            <MapView.Marker
              coordinate={{
                latitude: this.props.currentLocation.latitude
                  ? this.props.currentLocation.latitude
                  : 0,
                longitude: this.props.currentLocation.longitude
                  ? this.props.currentLocation.longitude
                  : 0
              }}
              title={"Bρίσκεστε εδώ"}
              //description={"desss"}
              image={require("../images/marker.png")}
            />
          ) : (
            " "
          )}

          {event ? (
            <MapView.Marker
              coordinate={{
                latitude: event.latitude ? event.latitude : 0,
                longitude: event.longitude ? event.longitude : 0
              }}
              title={"Νέο Περιστατικό"}
              image={require("../images/marker.png")}
            />
          ) : (
            ""
          )}

          {defibrillators.map(item => (
            <MapView.Marker
              key={item.id}
              // onClick={onMarkerClick}

              title={item.model}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              image={require("../images/defibrillator2.png")}
            />
          ))}
        </MapView>

        <SnackBar
          visible={message}
          textMessage={"Νέο Μήνυμα:" + "   " + message}
          actionHandler={() => {
            this.props.onMessageClean(message);
          }}
          position="top"
          top={1}
          actionText="x"
        />
        <SnackBar
          visible={this.state.closeSnackBar}
          textMessage={"Νέο Περιστατικό:" + "   " + addressOfEvent}
          actionHandler={() => {
            this.setState({ closeSnackBar: false });
          }}
          position="top"
          top={1}
          actionText="x"
        />
        {/* <CurrentLocation /> */}
        <AnimatedHideView visible={eventAnswer}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.handleGetDirections}
              title="✓ Aνταπόκριση"
              style={styles.buttonApprove}
              buttonStyle={{
                backgroundColor: "#008081",
                marginRight: 10
              }}
            />
            <Button
              onPress={this.handleRejection}
              title="✗ Aπόρριψη    "
              style={styles.buttonApprove}
              buttonStyle={{ backgroundColor: "#C62828" }}
            />
          </View>
        </AnimatedHideView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    //alignItems: "center",

    padding: 8,
    marginLeft: 10,

    marginTop: 50
  }
});

const mapStateToProps = state => ({
  currentLocation: state.currentLocation,
  defibrillators: state.defibrillators,
  message: state.message,
  userData: state.loggedInVolunteerData,
  loginData: state.loginData,
  event: state.event,
  addressOfEvent: state.event.address,
  nearestDefibrillator: state.nearestDefibrillator,
  eventAnswer: state.eventAnswer
});
const mapDispatchToProps = dispatch => ({
  onfetchDefifrillators: () => dispatch(fetchDefifrillators()),

  onEventReject: () => eventReject(dispatch),
  onMessageClean: data => messageClean(dispatch, data),
  onEventResponse: data => eventResponse(dispatch, data),
  onMessageReceive: data => messageReceive(dispatch, data),
  onEventReceive: data => eventReceive(dispatch, data),
  onEventClean: data => eventClean(dispatch, data),
  onLogout: userData => logout(dispatch, userData),
  onClear: loginData => clearLoginData(dispatch, loginData)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
