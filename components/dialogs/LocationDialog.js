import React from "react";
import { View, Picker } from "react-native";
import { changeLocation } from "../../store/actions/actions";
import { connect } from "react-redux";
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";

class LocationDialog extends React.Component {
  state = {
    location: ""
  };
  componentDidMount() {
    this.setState({
      location: this.props.userData.location
    });
  }

  handleSubmit = () => {
    const dataPouStelnw = {
      id: this.props.userData.id,
      location: this.state.location
    };
    this.props.onChangeLocation(dataPouStelnw);
    this.props.closeDialog();
  };

  render() {
    let { location } = this.state;
    const { dialogVisibility, closeDialog, userData } = this.props;

    return (
      <View>
        <Dialog
          width={0.8}
          visible={dialogVisibility}
          footer={
            <DialogFooter>
              <DialogButton text="Ακύρωση" onPress={() => closeDialog()} />
              <DialogButton text="OK" onPress={this.handleSubmit} />
            </DialogFooter>
          }
          dialogTitle={<DialogTitle title="Eπεξεργασία Κωδικού" />}
        >
          <DialogContent>
            <Picker
              style={{ width: "100%" }}
              selectedValue={location}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ location: itemValue })
              }
            >
              <Picker.Item
                label="Κεντρική Μακεδονία"
                value="Κεντρική Μακεδονία"
              />
              <Picker.Item label="Δυτική Μακεδονία" value="Δυτική Μακεδονία" />
              <Picker.Item label="Ήπειρος" value="Ήπειρος" />
              <Picker.Item label="Θεσσαλία" value="Θεσσαλία" />
              <Picker.Item label="Ιόνιοι Νήσοι" value="Ιόνιοι Νήσοι" />
              <Picker.Item label="Δυτική Ελλάδα" value="Δυτική Ελλάδα" />
              <Picker.Item label="Στερεά Ελλάδα" value="Στερεά Ελλάδα" />
              <Picker.Item label="Αττική" value="Αττική" />
              <Picker.Item label="Πελοπόννησος" value="Πελοπόννησος" />
              <Picker.Item label="Βόρειο Αιγαίο" value="Βόρειο Αιγαίο" />
              <Picker.Item label="Νότιο Αιγαίο" value="Νότιο Αιγαίο" />
              <Picker.Item label="Κρήτη" value="Κρήτη" />
            </Picker>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.loggedInVolunteerData
});
const mapDispatchToProps = dispatch => ({
  onChangeLocation: userData => dispatch(changeLocation(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDialog);
