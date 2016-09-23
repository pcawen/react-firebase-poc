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
		this.handleSignUp = this.handleSignUp.bind(this);
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
		    that.props.onUserLogedIn(data);
		})  
		.catch(function (error) {  
		    console.log('Request failed', error); 
		    switch (error.code) {
	      	case "auth/wrong-password":
	      		//Maybe set a custom error message
	        	console.log(error.message);
	        	break;
	      	case "auth/user-not-found":
	        	console.log(error.message);
	        	break;
	      	case "auth/invalid-email":
	        	console.log(error.message);
	        	break;
	        case "auth/email-already-in-use":
	        	console.log(error.message);
	        	break;
	        case "auth/network-request-failed":
	        	console.log(error.message);
	        	break;
	      	default:
	        	console.log("Error logging user in:", error);
	    }
		});
	    //this.setState({author: '', text: ''});
	}

	handleSignUp(e) {
		console.log('Sign up called');
		var auth = firebase.auth();
		var dbRefUsers = firebase.database().ref().child('users');
		var email = this.state.user.trim();
    	var pswd = this.state.pswd.trim();
    	if(!email || !pswd){
    		return;
    	}
		auth.createUserWithEmailAndPassword(email, pswd)
		.then(function (data) {  
		    console.log('Request succeeded with JSON response', data);  
		    // save the user's profile into the database so we can list users,
		    // use them in Security and Firebase Rules, and show profiles
		    dbRefUsers.child(data.uid).set({
		      name: 'HarcodedUserName',
		      role: 'u'
		    });
		})  
		.catch(function (error) {  
		    console.log('Request failed', error.code + ' ' + error.message);  
		});
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
	             <FlatButton label="Sign up" onClick={this.handleSignUp}/>
	             </div>
			</form>
			</Paper>
		)
	}
}
Login.propTypes = { iuser: React.PropTypes.string, ipswd: React.PropTypes.string };
Login.defaultProps = {iuser: '', ipswd: ''};

export default Login;