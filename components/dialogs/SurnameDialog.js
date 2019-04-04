import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeSurname } from "../../store/actions/actions";
class SurnameDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      surname: inputText
    };
    this.props.onChangeSurname(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;
    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Όνομα"}
          initValueTextInput={userData.surname}
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
  onChangeSurname: userData => dispatch(changeSurname(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurnameDialog);
