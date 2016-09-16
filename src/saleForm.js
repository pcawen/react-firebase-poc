import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SaleForm extends React.Component {
	constructor(props){
		super(props);
		this.onField1Step1Change = this.onField1Step1Change.bind(this);
		this.onField1Step2Change = this.onField1Step2Change.bind(this);
		this.onField1Step3Change = this.onField1Step3Change.bind(this);
	}

	state = {
	    stepIndex: 0,
	    field1step1: '',
	    field1step2: '',
	    field1step3: ''
	};

	handleNext = () => {
	    const {stepIndex} = this.state;
	    if (stepIndex < 2) {
	    	this.setState({stepIndex: stepIndex + 1});
	    } else {
	    	console.log('Submiting form');
	    	console.log(this.state);
	    	var saleData = {
	    		field1step1: this.state.field1step1,
	    		field1step2: this.state.field1step2,
	    		field1step3: this.state.field1step3
	    	};
	    	this.props.handleNewSale(saleData);
	    	this.props.onChangeView('DASHBOARD');
	    }
	};

	handlePrev = () => {
	    const {stepIndex} = this.state;
	    if (stepIndex > 0) {
	    	this.setState({stepIndex: stepIndex - 1});
	    }
	};

	onField1Step1Change(e) {
	    this.setState({field1step1: e.target.value});
	}
	onField1Step2Change(e) {
	    this.setState({field1step2: e.target.value});
	}
	onField1Step3Change(e) {
	    this.setState({field1step3: e.target.value});
	}


	renderStepActions(step) {
	    return (
	      <div style={{margin: '12px 0'}}>
	      	{step < 2 ? (
	        <RaisedButton
	          label="Next"
	          disableTouchRipple={true}
	          disableFocusRipple={true}
	          primary={true}
	          onTouchTap={this.handleNext}
	          style={{marginRight: 12}}
	        />
	        ) : (
	        <RaisedButton
	          label="Submit"
	          disableTouchRipple={true}
	          disableFocusRipple={true}
	          primary={true}
	          onTouchTap={this.handleNext}
	          style={{marginRight: 12}}
	        />
	        )}
	        {step > 0 && (
	          <FlatButton
	            label="Back"
	            disableTouchRipple={true}
	            disableFocusRipple={true}
	            onTouchTap={this.handlePrev}
	          />
	        )}
	      </div>
	    );
	}

	render() {
	    const {stepIndex} = this.state;

	    return (
	      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
	        <Stepper
	          activeStep={stepIndex}
	          linear={false}
	          orientation="vertical"
	        >
	          <Step>
	            <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
	              Select campaign settings
	            </StepButton>
	            <StepContent>
	              <p>
	                Content of step 1.
	              </p>
	              <TextField
			     	hintText="Insert your data"
			      	floatingLabelText="Field 1"
			      	onChange={ this.onField1Step1Change }
	                value={this.state.field1step1}
			     />
	              {this.renderStepActions(0)}
	            </StepContent>
	          </Step>
	          <Step>
	            <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
	              Create an ad group
	            </StepButton>
	            <StepContent>
	              <p>Content of step 2.</p>
	              <TextField
			     	hintText="Insert your data"
			      	floatingLabelText="Field 2"
			      	onChange={ this.onField1Step2Change }
	                value={this.state.field1step2}
			     />
	              {this.renderStepActions(1)}
	            </StepContent>
	          </Step>
	          <Step>
	            <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
	              Create an ad
	            </StepButton>
	            <StepContent>
	              <p>
	                Content of step 3.
	              </p>
	              <TextField
			     	hintText="Insert your data"
			      	floatingLabelText="Field 3"
			      	onChange={ this.onField1Step3Change }
	                value={this.state.field1step3}
			     />
	              {this.renderStepActions(2)}
	            </StepContent>
	          </Step>
	        </Stepper>
	      </div>
	    );
	}

}

export default SaleForm;