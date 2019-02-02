import React from "react";
import { View, StyleSheet } from "react-native";

import { MapView } from "expo";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      marker: {}
    };
  }
  static navigationOptions = {
    title: "Χάρτης",
    headerStyle: {
      backgroundColor: "#46929a"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
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
        </MapView>
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
