import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {user: props.iuser, pswd: props.ipswd};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.onPswdChange = this.onPswdChange.bind(this);
	}

	onUserChange(e) {
	    this.setState({user: e.target.value});
	}
	onPswdChange(e) {
	    this.setState({pswd: e.target.value});
	}

	handleSubmit(e){
		var that = this;
		console.log('handle submit called');
		e.preventDefault();
		var auth = firebase.auth();
		var email = this.state.user.trim();
    	var pswd = this.state.pswd.trim();
    	if(!email || !pswd){
    		return;
    	}
	    auth.signInWithEmailAndPassword(email, pswd)
		.then(function (data) {  
		    console.log('Request succeeded with JSON response', data);  
		    that.props.onUserLogedIn();
		})  
		.catch(function (error) {  
		    console.log('Request failed', error);  
		});
	    //this.setState({author: '', text: ''});
	}

	render() {
		const style = {
		  height: 210,
		  width: 350,
		  margin: 20,
		  textAlign: 'center',
		  margin: '0 auto',
    	  display: 'inherit'
		};
		const signInStyle = {
			'marginRight': 20
		}
		return (
			<Paper style={style} zDepth={3} >
			<form onSubmit={this.handleSubmit}>
	             <TextField
			     	hintText="User"
			      	floatingLabelText="Insert your user name"
			      	onChange={ this.onUserChange }
	                value={this.state.user}
			     />
			     <br />
			     <TextField
			     	type="password"
			     	hintText="Password"
			      	floatingLabelText="Insert your password"
			      	onChange={ this.onPswdChange }
	                value={this.state.pswd}
			     />
			     <div>
	             <RaisedButton type="submit" primary={true} style={signInStyle} label="Sign in" />
	             <FlatButton label="Sign up"/>
	             </div>
			</form>
			</Paper>
		)
	}
}
Login.propTypes = { iuser: React.PropTypes.string, ipswd: React.PropTypes.string };
Login.defaultProps = {iuser: '', ipswd: ''};

export default Login;