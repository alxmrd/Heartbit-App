import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeUsername } from "../../store/actions/actions";
class UsernameDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      username: inputText
    };
    this.props.onChangeUsername(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;
    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Όνομα Χρήστη"}
          initValueTextInput={userData.username}
          submitInput={inputText => {
            this.handleSubmit(inputText);
          }}
          closeDialog={() => closeDialog()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData
});
const mapDispatchToProps = dispatch => ({
  onChangeUsername: userData => dispatch(changeUsername(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameDialog);
