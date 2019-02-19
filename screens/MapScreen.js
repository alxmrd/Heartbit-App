import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MapView } from "expo";
import { Button } from "react-native-elements";
import SettingsScreen from "./SettingsScreen";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import navigation from "react-navigation";
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
        fontWeight: "bold"
      },

      headerRight: (
        <Button
          onPress={navigation.getParam("logout")}
          title="Αποσύνδεση"
          type="clear"
          titleStyle={{ fontSize: 14, color: "#fff" }}
          icon={<Icon name="sign-out" size={15} color="white" />}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
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
        </MapView>
        <SettingsScreen />
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
  currentLocation: state.currentLocation
});

export default connect(
  mapStateToProps,
  null
)(MapScreen);
