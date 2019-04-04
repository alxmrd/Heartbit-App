import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
import { changeTel2 } from "../../store/actions/actions";
class Tel2Dialog extends React.Component {
  handleSubmit = inputText => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      tel2: inputText
    };
    this.props.onChangeTel2(dataPouStelnw);
    this.props.closeDialog();
  };
  render() {
    const { dialogVisibility, closeDialog, userData } = this.props;
    if (userData.tel2) {
      var tel2string = userData.tel2.toString();
    }

    return (
      <View>
        <DialogInput
          isDialogVisible={dialogVisibility}
          title={"Eπεξεργασία Εθελοντή"}
          message={"Εναλλακτικό Τηλέφωνο"}
          initValueTextInput={tel2string}
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
  onChangeTel2: userData => dispatch(changeTel2(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tel2Dialog);
