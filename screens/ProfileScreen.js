import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { logout, clearLoginData, successLogin } from "../store/actions/actions";
import { Divider, Avatar } from "react-native-elements";
import NameDialog from "../components/dialogs/NameDialog.js";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {},
      redirect: false,
      dialogVisible: false
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
    this._getStorageValue();
  }
  async _getStorageValue() {
    const token = await AsyncStorage.getItem("token");
    const username = await AsyncStorage.getItem("username");

    if (username && token) {
      this.props.onSuccessLogin(username, token);
    }
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
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    const { user } = this.props;
    return (
      <ScrollView>
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
                // onPress={() => alert("ei")}
                title={
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 20
                      }}
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
                rightAvatar={
                  <TouchableOpacity>
                    <Avatar
                      rounded
                      icon={{ name: "edit" }}
                      size="small"
                      color="#008080"
                    />
                  </TouchableOpacity>
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
                rightAvatar={
                  <TouchableOpacity>
                    <Avatar
                      rounded
                      icon={{ name: "edit" }}
                      size="small"
                      color="#008080"
                    />
                  </TouchableOpacity>
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
                rightAvatar={
                  <TouchableOpacity>
                    <Avatar
                      rounded
                      icon={{ name: "edit" }}
                      size="small"
                      color="#008080"
                    />
                  </TouchableOpacity>
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
                rightAvatar={
                  <TouchableOpacity onPress={() => this.showDialog()}>
                    <Avatar
                      rounded
                      icon={{ name: "edit" }}
                      size="small"
                      color="#008080"
                    />
                  </TouchableOpacity>
                }
              />
              {/* <Divider
                style={{ backgroundColor: "blue" }}
                style={{ marginBottom: 10, marginTop: 10 }}
              /> */}
              {/* <ListItem
                title={
       
                    <Button
                      icon={<Entypo name="edit" size={15} color="white" />}
                      title=" Eπεξεργασία Εθελοντή"
                      onPress={this.showDialog}
                    />
                  </TouchableOpacity>
                }
              /> */}
            </View>
          </Card>
        </View>
        <NameDialog
          dialogVisibility={this.state.dialogVisible}
          closeDialog={() => this.handleCancel()}
          userData={user}
        />
      </ScrollView>
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
    fontSize: 16
  },
  editView: {
    color: "#0C03C1",
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20
  }
});

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData,
  userData: state.loggedInVolunteerData,
  loginData: state.loginData
});

const mapDispatchToProps = dispatch => ({
  onLogout: userData => logout(dispatch, userData),
  onClear: loginData => clearLoginData(dispatch, loginData),
  onSuccessLogin: (username, token) => dispatch(successLogin(username, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
