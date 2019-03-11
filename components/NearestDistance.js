import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import geolib from "geolib";

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    let geolib = require("geo-lib");

    let result = geolib.Distance({
      p1: { lat: this.state.latitude, lon: this.state.longitude },
      p2: { lat: 33.613355, lon: -117.373261 }
    });

    return (
      <View
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Distance between two points:result </Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

export default GeolocationExample;
