import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import geolib from "geolib";
import { connect } from "react-redux";

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
    geolib.getDistance(
      { latitude: 51.5103, longitude: 7.49347 },
      { latitude: "51° 31' N", longitude: "7° 28' E" }
    );
    geolib.getDistance(
      { latitude: 51.5103, longitude: 7.49347 },
      { latitude: "51° 31' N", longitude: "7° 28' E" }
    );

    // Working with W3C Geolocation API

    navigator.geolocation.getCurrentPosition(
      function(position) {
        this.props.defibrillators.map(
          item => console.log(item.latitude)
          // alert(
          //   geolib.getPathLength([
          //     {
          //       latitude: position.coords.latitude,
          //       longitude: position.coords.longitude
          //     }, // Berlin
          //     {
          //       latitude: item.latitude,
          //       longitude: item.longitude
          //     }, // Dortmund
          //     { latitude: 51.503333, longitude: -0.119722 } // London
          //   ])
          // )
        );
      },
      function() {
        alert("Position could not be determined.");
      },
      {
        enableHighAccuracy: true
      }
    );

    // in this case set offset to 1 otherwise the nearest point will always be your reference point

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

const mapStateToProps = state => ({
  currentLocation: state.currentLocation,
  defibrillators: state.defibrillators
});

export default connect(
  mapStateToProps,
  null
)(GeolocationExample);
