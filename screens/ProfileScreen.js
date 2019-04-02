import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import {
  logout,
  clearLoginData,
  successLogin,
  clearMessage
} from "../store/actions/actions";
import { Divider, Avatar } from "react-native-elements";
import NameDialog from "../components/dialogs/NameDialog.js";
import SurnameDialog from "../components/dialogs/SurnameDialog.js";
import UsernameDialog from "../components/dialogs/UsernameDialog.js";
import PasswordDialog from "../components/dialogs/PasswordDialog.js";
import TelDialog from "../components/dialogs/TelDialog.js";
import Tel2Dialog from "../components/dialogs/Tel2Dialog.js";
import AddressDialog from "../components/dialogs/AddressDialog.js";
import LocationDialog from "../components/dialogs/LocationDialog.js";
import EmailDialog from "../components/dialogs/EmailDialog.js";
import SwitchToggle from "react-native-switch-toggle";
import ActionButton from "react-native-action-button";
import SnackBar from "react-native-snackbar-component";
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
      LocationDialogVisible: false,
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
        textAlign: "center",
        flex: 1,
        fontWeight: "bold",
        fontFamily: "space-mono"
      },

      headerRight: (
        <Button
          onPress={navigation.getParam("logout")}
          title="Αποσύνδεση"
          type="clear"
          titleStyle={{
            fontSize: 14,
            color: "#fff",
            fontFamily: "space-mono"
          }}
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
    this._getStorageValue();
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
  showUsernameDialog = () => {
    this.setState({ UsernameDialogVisible: true });
  };
  showPasswordDialog = () => {
    this.setState({ PasswordDialogVisible: true });
  };
  showSurnameDialog = () => {
    this.setState({ SurnameDialogVisible: true });
  };
  showAddressDialog = () => {
    this.setState({ AddressDialogVisible: true });
  };
  showTel1Dialog = () => {
    this.setState({ Tel1DialogVisible: true });
  };
  showTel2Dialog = () => {
    this.setState({ Tel2DialogVisible: true });
  };
  showLocationDialog = () => {
    this.setState({ LocationDialogVisible: true });
  };
  showEmailDialog = () => {
    this.setState({ EmailDialogVisible: true });
  };

  handleCancel = () => {
    this.setState({
      NameDialogVisible: false,
      SurnameDialogVisible: false,
      PasswordDialogVisible: false,
      Tel1DialogVisible: false,
      Tel2DialogVisible: false,
      UsernameDialogVisible: false,
      EmailDialogVisible: false,
      LocationDialogVisible: false,
      AddressDialogVisible: false
    });
  };
  handleTogglePress = () => {
    this.setState({ isOnline: !this.state.isOnline });
  };

  render() {
    const { user } = this.props;
    return (
      <ScrollView>
        {user.name ? (
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
                      activeOpacity={0.7}
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
                      backTextRight={user.isOnline ? "" : "OFF"}
                      backTextLeft={user.isOnline ? "ON" : ""}
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
                    <TouchableOpacity onPress={() => this.showUsernameDialog()}>
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
                    <TouchableOpacity onPress={() => this.showSurnameDialog()}>
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
                    <TouchableOpacity onPress={() => this.showEmailDialog()}>
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
                    <TouchableOpacity onPress={() => this.showPasswordDialog()}>
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
                    <TouchableOpacity onPress={() => this.showTel1Dialog()}>
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
                    <TouchableOpacity onPress={() => this.showTel2Dialog()}>
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
                    <TouchableOpacity onPress={() => this.showAddressDialog()}>
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
                    <TouchableOpacity onPress={() => this.showLocationDialog()}>
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
                      <Text style={styles.ratingText}>
                        {user.latesttraining}
                      </Text>
                    </View>
                  }
                />
              </View>
            </Card>
            <NameDialog
              dialogVisibility={this.state.NameDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <SurnameDialog
              dialogVisibility={this.state.SurnameDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <UsernameDialog
              dialogVisibility={this.state.UsernameDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <TelDialog
              dialogVisibility={this.state.Tel1DialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <Tel2Dialog
              dialogVisibility={this.state.Tel2DialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <AddressDialog
              dialogVisibility={this.state.AddressDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <LocationDialog
              dialogVisibility={this.state.LocationDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <EmailDialog
              dialogVisibility={this.state.EmailDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <PasswordDialog
              dialogVisibility={this.state.PasswordDialogVisible}
              closeDialog={() => this.handleCancel()}
              userData={user}
            />
            <SnackBar
              visible={this.props.errorMessage.httpstatus === "error"}
              textMessage={this.props.errorMessage.message}
              actionHandler={() => {
                this.props.onClearMessage(this.props.errorMessage);
              }}
              top={1}
              position="top"
              actionText="x"
            />
          </View>
        ) : (
          <View style={[styles.loading, styles.horizontal]}>
            <ActivityIndicator size="large" color="#008080" />
          </View>
        )}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row"
  },
  horizontal: {
    margin: 200,
    justifyContent: "space-around",
    padding: 10,
    flexDirection: "column"
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
  loginData: state.loginData,
  errorMessage: state.errorMessage
});

const mapDispatchToProps = dispatch => ({
  onLogout: userData => logout(dispatch, userData),
  onClear: loginData => clearLoginData(dispatch, loginData),
  onSuccessLogin: (username, token) => dispatch(successLogin(username, token)),
  onClearMessage: message => clearMessage(dispatch, message)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
