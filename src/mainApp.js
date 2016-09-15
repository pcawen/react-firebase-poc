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
	    this.state = {
	      authenticated: false,
	      currentView: 'DASHBOARD',
	      localities: {},
	      items: [{value: 'one', label: 'One'}]
	    };
	}

	handleUserLogedIn(){
		console.log('Handle user loged Outer called');
		this.setState({authenticated: true});
	}

	handleCurrentView(aView){
		console.log('Change view called' + aView);
		this.setState({currentView: aView});
	}

	handleLogOut(){
		console.log('loged out');
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  this.setState({authenticated: false});
		}, function(error) {
		  // An error happened.
		  console.log(error);
		});
		
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

	componentDidMount() {
		/*this.setState({
			items: [{id: 'one', text: 'One'},{id: 'two', text: 'Two'}, {id: 'tree', text: 'Tree'}]
		});*/
		const db = firebase.database();
		const dbRefLocalities = db.ref().child('localities');
		dbRefLocalities.on('value', snap => {
			console.log(snap.val());
			//this.setState({someState: snap.val()});
			//var arrayItems = Object.keys(snap.val()).map(key => snap.val()[key]);
			//console.log(arrayItems);
			this.setState({
				items: snap.val()
			});
		});
	}

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
					{this.state.currentView == 'DASHBOARD' ? (
						<Dashboard onChangeView={this.handleCurrentView} items={this.state.items}/>
					) : (
						<SaleForm onChangeView={this.handleCurrentView}/>
					)}
					</div>
				)}
			</div>
			</MuiThemeProvider>
		)
	}
}

export default MainApp;