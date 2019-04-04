import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeAddress } from "../../store/actions/actions";
class AddressDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      address: inputText
    };
    this.props.onChangeAddress(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;
    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Διεύθυνση"}
          initValueTextInput={userData.address}
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
  onChangeAddress: userData => dispatch(changeAddress(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressDialog);
