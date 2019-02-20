import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";

import { Divider, Avatar } from "react-native-elements";
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      marker: {},
      redirect: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Προφίλ",
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
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          <View>
            <ListItem
              leftAvatar={
                <Avatar
                  rounded
                  icon={{ name: "account-circle" }}
                  size="medium"
                  color="#008080"
                />
              }
              title="Όνομα Χρήστη"
              subtitle={user.username}
            />
          </View>
          <Divider
            style={{ backgroundColor: "blue" }}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    justifyContent: "flex-end",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData
});

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
