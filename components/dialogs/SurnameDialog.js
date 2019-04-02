import React from "react";
import { View } from "react-native";
import DialogInput from "react-native-dialog-input";
import { connect } from "react-redux";
function SurnameDialog({ dialogVisibility, closeDialog, userData }) {
  return (
    <View>
      <DialogInput
        isDialogVisible={dialogVisibility}
        title={"Eπεξεργασία Εθελοντή"}
        message={"Επώνυμο"}
        initValueTextInput={userData.surname}
        submitInput={inputText => {
          this.sendInput(inputText);
        }}
        closeDialog={() => closeDialog()}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData
});

export default connect(mapStateToProps)(SurnameDialog);