import React from "react";
import { View } from "react-native";
import { TextField } from "react-native-material-textfield";
import { connect } from "react-redux";
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";
import { changePassword, clearMessage } from "../../store/actions/actions";

class PasswordDialog extends React.Component {
  state = {
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
    error: "",
    errorNew: ""
  };
  componentDidMount() {
    this.setState({
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
      error: "",
      errorNew: ""
    });
  }

  checkPassword = () => {
    if (this.state.password !== this.props.userData.password) {
      this.setState({ error: "Λάθος Κωδικός" });
    }
    if (this.state.password == this.props.userData.password) {
      this.setState({ error: "" });
    }
  };
  checkNewPassword = () => {
    if (this.state.newPassword !== this.state.newPasswordConfirmation) {
      this.setState({ errorNew: "O κωδικός δεν ταιρίαζει" });
    }
    if (
      this.state.newPassword == this.state.newPasswordConfirmation &&
      this.state.error == ""
    ) {
      this.setState({ errorNew: "" });
      const dataPouStelnw = {
        id: this.props.userData.id,
        password: this.state.newPassword
      };
      this.props.onChangePassword(dataPouStelnw);
      this.props.closeDialog();
    }
  };

  render() {
    let { password, newPassword, newPasswordConfirmation } = this.state;
    const { dialogVisibility, closeDialog, userData } = this.props;

    return (
      <View>
        <Dialog
          width={0.8}
          visible={dialogVisibility}
          footer={
            <DialogFooter>
              <DialogButton text="Ακύρωση" onPress={() => closeDialog()} />
              <DialogButton text="OK" onPress={() => this.checkNewPassword()} />
            </DialogFooter>
          }
          dialogTitle={<DialogTitle title="Eπεξεργασία Κωδικού" />}
        >
          <DialogContent>
            <TextField
              label="Εισαγωγή Κωδικού"
              // style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              // onChangeText={(text) => this.setState({text})}
              value={password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              error={this.state.error}
            />
            <TextField
              onFocus={() => this.checkPassword()}
              label="Πληκτρολογείστε Νέο Κωδικό"
              characterRestriction={10}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={newPassword => this.setState({ newPassword })}
            />
            <TextField
              label="Eπαληθεύεστε τον νέο Κωδικό"
              characterRestriction={10}
              secureTextEntry={true}
              value={newPasswordConfirmation}
              error={this.state.errorNew}
              onChangeText={newPasswordConfirmation =>
                this.setState({ newPasswordConfirmation })
              }
            />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData,
  errorMessage: state.errorMessage
});
const mapDispatchToProps = dispatch => ({
  onChangePassword: userData => dispatch(changePassword(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordDialog);
