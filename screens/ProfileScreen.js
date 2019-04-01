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
import SwitchToggle from "react-native-switch-toggle";
//import { robotoWeights } from "react-native-typography";
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {},
      redirect: false,
      NameDialogVisible: false,
      SurnameDialogVisible: false,
      PasswordDialogVisible: false,
      Tel1DialogVisible: false,
      Tel2DialogVisible: false,
      UsernameDialogVisible: false,
      EmailDialogVisible: false,
      isOnline: false,
      AddressDialogVisible: false,
      switchOn1: false,
      switchOn2: false,
      switchOn4: false
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
        alignItems: "center",
        justifyContent: "center"
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
  showNameDialog = () => {
    this.setState({ NameDialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ NameDialogVisible: false });
  };
  handleTogglePress = () => {
    this.setState({ isOnline: !this.state.isOnline });
  };

  getRightText() {
    return this.props.isOnline ? "ΟFF" : "";
  }

  getLeftText() {
    return this.props.isOnline ? "" : "ΟN";
  }
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
                rightAvatar={
                  <SwitchToggle
                    type={1}
                    buttonStyle={{
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute"
                    }}
                    rightContainerStyle={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    leftContainerStyle={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start"
                    }}
                    backTextRight={this.getRightText()}
                    backTextLeft={this.getLeftText()}
                    textRightStyle={{ fontSize: 12 }}
                    textLeftStyle={{ fontSize: 12 }}
                    containerStyle={{
                      marginTop: 16,
                      width: 90,
                      height: 35,
                      borderRadius: 25,
                      backgroundColor: "#ccc",
                      padding: 5
                    }}
                    circleStyle={{
                      width: 25,
                      height: 25,
                      borderRadius: 19,
                      backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={user.isOnline}
                    onPress={this.handleTogglePress}
                    circleColorOff="#C62828"
                    circleColorOn="#008080"
                    duration={500}
                  />
                }
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
                  <TouchableOpacity onPress={() => this.showNameDialog()}>
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
                    <Text style={styles.titleView}>Kωδικός</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>••••••••••</Text>
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
                    <Text style={styles.titleView}>Τηλέφωνο</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>{user.tel1}</Text>
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
                    <Text style={styles.titleView}>Εναλλακτικό Tηλέφωνο</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>
                      {user.tel2 ? user.tel2 : "Κενό"}
                    </Text>
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
                    <Text style={styles.titleView}>Διεύθυνση</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>{user.address}</Text>
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
                    <Text style={styles.titleView}>Περιφέρεια</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>{user.location}</Text>
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
                    <Text style={styles.titleView}>Ημερομηνία Γέννησης</Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>{user.dateofbirth}</Text>
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
                    <Text style={styles.titleView}>
                      Hμερομηνία Τελευταίας Εκπαίδευσης
                    </Text>
                  </View>
                }
                subtitle={
                  <View>
                    <Text style={styles.ratingText}>{user.latesttraining}</Text>
                  </View>
                }
              />
            </View>
          </Card>
        </View>
        <NameDialog
          dialogVisibility={this.state.NameDialogVisible}
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
