import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

class ValidationForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      field1step1: ''
    };
  }

  onField1Step1Change = (e) => {
    this.setState({field1step1: e.target.value});
  }

  render() {
    return(
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <h1>Validation form</h1>
        <AutoComplete
          floatingLabelText="Type validator name"
          filter={AutoComplete.caseInsensitiveFilter}
          openOnFocus={true}
          dataSource={colors} 
        />
        <TextField
          hintText="Insert your data"
          floatingLabelText="Data to be validated"
          onChange={ this.onField1Step1Change }
          value={this.state.field1step1}
        />
        {/*<Checkbox
                  label="Validated"
                />*/}
        <RaisedButton
        label="Send to validate"
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleNext}
        style={{marginRight: 12}}
        />
      </div>
    )
  }
}

export default ValidationForm;