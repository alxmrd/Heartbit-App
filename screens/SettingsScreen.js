import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { connect } from "react-redux";
import { currentLocation } from "../store/actions/actions";
class CurrentLocation extends Component {
  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } }
  };

  componentDidMount() {
    this._getLocationAsync();
  }
  componentDidUpdate(prevState) {
    //Typical usage (don't forget to compare props):
    if (this.state.location !== prevState.location) {
      let location = this.state.location.coords;
      this.props.onCurrentLocation(location);
    }
  }
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView.Marker
          coordinate={this.state.location.coords}
          title="Βρίσκεστε εδώ"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});

const mapStateToProps = state => ({
  currentLocation: state.currentLocation
});
const mapDispatchToProps = dispatch => ({
  onCurrentLocation: dataPouStelnw => currentLocation(dispatch, dataPouStelnw)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentLocation);
