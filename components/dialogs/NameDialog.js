import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeName } from "../../store/actions/actions";
class NameDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      name: inputText
    };
    this.props.onChangeName(dataPouStelnw);
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
          initValueTextInput={userData.name}
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
  onChangeName: userData => dispatch(changeName(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameDialog);
