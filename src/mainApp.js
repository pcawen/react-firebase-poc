import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Login from './login';
import Dashboard from './dashboard';
import SaleForm from './saleForm';
import * as firebase from 'firebase';

class MainApp extends Component {

	constructor(props) {
	    super(props);
	    this.handleUserLogedIn = this.handleUserLogedIn.bind(this);
	    this.handleCurrentView = this.handleCurrentView.bind(this);
	    this.handleLogOut = this.handleLogOut.bind(this);
	    this.handleNewSale = this.handleNewSale.bind(this);
	    this.state = {
	      authenticated: false,
	      currentView: 'DASHBOARD',
	      localities: {},
	      //items: {value: 'one', label: 'One'},
	      uId: '',
	      userName: ''
	    };
	}

	handleUserLogedIn(user){
		console.log('User logged in with id: ' + user.uid);
		this.setState({uId: user.uid});
		if(user.displayName){
			console.log('displayName: ' + user.displayName);
			this.setState({userName: user.displayName});
		} else {
			console.log('User name: ' + this.getName(user));
			this.setState({userName: this.getName(user)});
		}
		this.setState({authenticated: true});
		
		/*var user = firebase.auth().currentUser;
		user.updateProfile({
		  displayName: 'Pablo',
		  photoURL: "https://example.com/jane-q-user/profile.jpg"
		}).then(function() {
		  // Update successful.
		  console.log('Update successful.');
		}, function(error) {
		  // An error happened.
		  console.log('Error: ' + error);
		});*/
	}

	getName(authData) {
	  var provider = authData.providerData[0];
	  switch(provider.providerId) {
	     case 'password':
	       return provider.email.replace(/@.*/, '');
	     case 'twitter':
	       return provider.displayName;
	     case 'facebook':
	       return provider.displayName;
	  }
	}

	handleCurrentView(aView){
		console.log('Change view called' + aView);
		this.setState({currentView: aView});
	}

	handleLogOut(){
		console.log('loged out');
		firebase.auth().signOut().then( () => {
		  // Sign-out successful.
		  this.setState({authenticated: false});
		}, error => {
		  // An error happened.
		  console.log(error);
		});
	}

	handleNewSale(aSale){
		console.log('New sale called');
		console.log(aSale);
		var dbRefSales = firebase.database().ref().child('sales/' + this.state.uId);
		dbRefSales.push(aSale);
	}

	/*firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
		} else {
			console.log('Not logged in');
		}
	});*/

	//convert objet to array
	//var newArrayItems = Object.keys(items).map(function(key){return items[key];});
	//ES6 way
	//var newArrayItems = Object.keys(items).map(key => items[key]);
	/*componentDidMount() {
		var dbRefLocalities = firebase.database().ref().child('localities');
		var dbRefSales = firebase.database().ref().child('sales');
		dbRefLocalities.on('value', snap => {
			console.log(snap.val());
			this.setState({
				items: snap.val()
			});
		});
		dbRefSales.on('child_added', snap => {
			console.log('>>>Sales');
			console.log(snap.val());
		});
	}*/

	render() {
		return (
			<MuiThemeProvider>
			<div>
				{!this.state.authenticated ? (
					<Login onUserLogedIn={this.handleUserLogedIn}/>
				) : (
					<div>
					<AppBar
					    title="POC header"
					    onTitleTouchTap={this.handleCurrentView.bind(this,'DASHBOARD')}
					    showMenuIconButton={false}
    					iconElementRight={<FlatButton label="Log Out" onTouchTap={this.handleLogOut}/>}
					/>
					<span>{this.state.userName}</span>
					{this.state.currentView == 'DASHBOARD' ? (
						<Dashboard onChangeView={this.handleCurrentView} uId={this.state.uId}/>
					) : (
						<SaleForm onChangeView={this.handleCurrentView} handleNewSale={this.handleNewSale}/>
					)}
					</div>
				)}
			</div>
			</MuiThemeProvider>
		)
	}
}

export default MainApp;