import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeTel } from "../../store/actions/actions";
class TelDialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      tel1: inputText
    };
    this.props.onChangeTel(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;

    var tel1string = userData.tel1.toString();
    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Τηλέφωνο"}
          initValueTextInput={tel1string}
          submitInput={inputText => {
            this.handleSubmit(inputText);
          }}
          textInputProps={{ keyboardType: "phone-pad" }}
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
  onChangeTel: userData => dispatch(changeTel(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelDialog);
