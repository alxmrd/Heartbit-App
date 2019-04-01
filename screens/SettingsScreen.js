import React from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { logout, clearLoginData } from "../store/actions/actions";
import { Divider, Avatar } from "react-native-elements";
import ActionButton from "react-native-action-button";
class SettingsScreen extends React.Component {
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
        fontFamily: "space-mono",
        textAlign: "center",
        flex: 1
      },

      headerRight: (
        <Button
          onPress={navigation.getParam("logout")}
          title="Αποσύνδεση"
          type="clear"
          titleStyle={{ fontSize: 14, color: "#fff", fontFamily: "space-mono" }}
          icon={<Icon name="sign-out" size={15} color="white" />}
        />
      ),
      headerLeft: (
        <View>
          <Button
            title="    EKAB"
            type="clear"
            titleStyle={{
              fontSize: 14,
              color: "#fff",
              fontFamily: "space-mono"
            }}
          />
          <ActionButton
            offsetY={3}
            offsetX={5}
            size={35}
            buttonColor="rgba(231,76,60,1)"
            position="left"
            buttonText="📞"
            onPress={navigation.getParam("showAlert")}
          />
        </View>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    this.props.navigation.setParams({ showAlert: this._showAlert });
  }
  _showAlert = () => {
    Alert.alert(
      "Τηλέφωνο Άμεσης Βοήθειας ΕΚΑΒ",
      "Είστε σίγουρος;",
      [
        {
          text: "Nαι",
          onPress: () => Linking.openURL("tel:+302461029166"),
          style: "cancel"
        },
        {
          text: "Ακύρωση",
          onPress: () => console.log("Cancel Pressed")
        }
      ],
      { cancelable: false }
    );
  };

  _logout = async () => {
    try {
      const token = await AsyncStorage.removeItem("token");
      if (token == null) {
        this.props.navigation.navigate("Login");
        this.props.onLogout(this.props.userData);
        this.props.onClear(this.props.loginData);
      }
    } catch (error) {
      console.log("error on removing data");
    }
  };

  render() {
    const { user } = this.props;
    return (
      <View>
        <Card containerStyle={{ padding: 0 }}>
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
              title={
                <View>
                  <Text
                    style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
                  >
                    Προφίλ Εθελοντή
                  </Text>
                </View>
              }
            />
            <Divider
              style={{ backgroundColor: "blue" }}
              style={{ marginBottom: 5, marginTop: 10 }}
            />
            <ListItem
              title={
                <View>
                  <Text style={styles.titleView}>Όνομα Χρήστη</Text>
                </View>
              }
              subtitle={
                <View>
                  <Text style={styles.ratingText}>{user.username}</Text>
                </View>
              }
            />
            <Divider
              style={{ backgroundColor: "blue" }}
              style={{ marginBottom: 5, marginTop: 5 }}
            />
            <ListItem
              title={
                <View>
                  <Text style={styles.titleView}>Όνομα</Text>
                </View>
              }
              subtitle={
                <View>
                  <Text style={styles.ratingText}>{user.name}</Text>
                </View>
              }
            />
            <Divider
              style={{ backgroundColor: "blue" }}
              style={{ marginBottom: 5, marginTop: 5 }}
            />
            <ListItem
              title={
                <View>
                  <Text style={styles.titleView}>Eπώνυμο</Text>
                </View>
              }
              subtitle={
                <View>
                  <Text style={styles.ratingText}>{user.surname}</Text>
                </View>
              }
            />
            <Divider
              style={{ backgroundColor: "blue" }}
              style={{ marginBottom: 5, marginTop: 5 }}
            />
            <ListItem
              title={
                <View>
                  <Text style={styles.titleView}>E-mail</Text>
                </View>
              }
              subtitle={
                <View>
                  <Text style={styles.ratingText}>{user.email}</Text>
                </View>
              }
            />
          </View>
          <Divider
            style={{ backgroundColor: "blue" }}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          {/* <Text style={{ marginBottom: 10 }}>
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
          /> */}
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
  },

  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
    fontSize: 20
  },
  titleView: {
    color: "teal",
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 24
  }
});

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData,
  userData: state.loggedInVolunteerData,
  loginData: state.loginData
});

const mapDispatchToProps = dispatch => ({
  onLogout: userData => logout(dispatch, userData),
  onClear: loginData => clearLoginData(dispatch, loginData)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
