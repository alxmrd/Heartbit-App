import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MapView } from "expo";
import { Button } from "react-native-elements";
import Pusher from "pusher-js/react-native";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import navigation from "react-navigation";
import { fetchDefifrillators } from "../store/actions/actions";
import CurrentLocation from "../components/CurrentLocation";
import Echo from "laravel-echo";

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      marker: {},
      redirect: false
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
    // window.Echo = new Echo({
    //   broadcaster: Pusher,
    //   key: "2f7f2a748cacde676705",
    //   cluster: "eu",
    //   encrypted: true
    // });

    // window.Echo.channel("channel").listen("event", e => {
    //   alert(JSON.stringify(e));
    // });
    var pusher = new Pusher("2f7f2a748cacde676705", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("channel");
    channel.bind("event", function(data) {
      alert(JSON.stringify(data));
    });
  }
  async _getStorageValue() {
    var token = await AsyncStorage.getItem("token");

    this.props.onfetchDefibrillators(token);
  }
  _logout = async () => {
    try {
      const token = await AsyncStorage.removeItem("token");
      if (token == null) {
        this.props.navigation.navigate("Login");
      }
    } catch (error) {
      console.log("error on removing data");
    }
  };

  render() {
    const { defibrillators } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.30069,
            longitude: 21.78896,
            latitudeDelta: 0.001,
            longitudeDelta: 0.02
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 40.30069, longitude: 21.78896 }}
            title={"Koζάνη"}
            //description={"desss"}
          />
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
        <CurrentLocation />
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
  }
});

const mapStateToProps = state => ({
  currentLocation: state.currentLocation,
  defibrillators: state.defibrillators
});
const mapDispatchToProps = dispatch => ({
  onfetchDefibrillators: token => dispatch(fetchDefifrillators(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
