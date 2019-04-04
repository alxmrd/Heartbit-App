import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeEmail } from "../../store/actions/actions";
class EmailDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      email: inputText
    };
    this.props.onChangeEmail(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;
    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Ε-mail"}
          initValueTextInput={userData.email}
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
  onChangeEmail: userData => dispatch(changeEmail(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDialog);
