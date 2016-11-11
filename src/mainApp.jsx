import React, { Component } from 'react';
import './App.css';
//--Material-ui imports--
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
//--/Material-ui imports--
import Login from './login';
import Dashboard from './dashboard';
import AdminDashboard from './adminDashboard';
import SaleForm from './saleForm';
import ValidationForm from './validationForm';

import * as firebase from 'firebase';

const styles = {
	notificationsBadge: {
		padding: '15px 15px 0px 0px',
		verticalAlign: 'middle'
	},
	headerStyle: {
		color: 'white'
	},
	logOut: {
		color: 'white'
	}
};

class MainApp extends Component {

	constructor(props) {
		super(props);
		this.handleUserLogedIn = this.handleUserLogedIn.bind(this);
		this.handleCurrentView = this.handleCurrentView.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleNewSale = this.handleNewSale.bind(this);
		//this.handleTouchTap = this.handleTouchTap.bind(this);
		//this.handleRequestClose = this.handleRequestClose.bind(this);
		this.state = {
	      authenticated: false,
	      //authenticated: true,
	      currentView: 'DASHBOARD',
	      localities: {},
	      //items: {value: 'one', label: 'One'},
	      uId: '',
	      userName: '',
	      userRole: 'u',//'a'
	      open: false, //Notification pop Over status
	      drawerOpen: false
	    };
	  }

	  //Notifications popOver stuff
	  handleTouchTap = (event) => {
	    // This prevents ghost click.
	    event.preventDefault();

    	this.setState({
	      open: true,
	      anchorEl: event.currentTarget,
	    });
	  };

	  handleRequestClose = () => {
	    this.setState({
	      open: false,
	    });
	  };
	  //---------------------------

	  handleUserLogedIn(user){
	  	console.log('User logged in with id: ' + user.uid);
	  	var dbRefUsers = firebase.database().ref().child('users/' + user.uid);
	  	this.setState({uId: user.uid});
	  	if(user.displayName){
	  		console.log('displayName: ' + user.displayName);
	  		this.setState({userName: user.displayName});
	  	} else {
	  		console.log('User name: ' + this.getName(user));
	  		this.setState({userName: this.getName(user)});
	  	}
	  	dbRefUsers.on('value', snap => {
	  		console.log('>>>Current user data:');
	  		console.log(snap.val());
	  		this.setState({userRole: snap.val().role, authenticated: true});
	  	});

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

	handleCloseDrawer = () => {
		this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
	}

	handleNewValidation = () => {
		console.log('new validation');
		this.setState({
      currentView: 'NEW_VALIDATION',
      drawerOpen: false
    });
	}

	handleNewMessage = () => {
		console.log('new message');
		this.setState({
      currentView: 'NEW_MESSAGE',
      drawerOpen: false
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
				<AppBar className="header-appbar"
					title="POC header"
					onLeftIconButtonTouchTap={this.handleCloseDrawer}
					onTitleTouchTap={this.handleCurrentView.bind(this,'DASHBOARD')}
					showMenuIconButton={true}
					iconElementRight={
						<div style={styles.headerStyle}>
							<Badge
								className="notifications-badge"
								badgeContent={10}
								primary={true}
								badgeStyle={{top: 12, right: 12}}
								style={styles.notificationsBadge}>
								<IconButton tooltip="Notifications" onTouchTap={this.handleTouchTap}>
									<NotificationsIcon />
								</IconButton>
								<Popover
									open={this.state.open}
									anchorEl={this.state.anchorEl}
									anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
									targetOrigin={{horizontal: 'left', vertical: 'top'}}
									onRequestClose={this.handleRequestClose}
									>
									<Menu>
										<MenuItem primaryText="Validations" />
										<MenuItem primaryText="Messages" />
									</Menu>
								</Popover>
							</Badge>
							<span>{this.state.userName}</span>
							<FlatButton style={styles.logOut} label="Log Out" onTouchTap={this.handleLogOut}/>
						</div>
					}
				/>
				<Drawer docked={false} open={this.state.drawerOpen} onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
          <MenuItem 
          	primaryText="New Validation"
          	leftIcon={<AvPlaylistAddCheck/>} 
          	onTouchTap={this.handleNewValidation}>
          </MenuItem>
          <MenuItem 
          	primaryText="New message"
          	leftIcon={<CommunicationMessage/>} 
          	onTouchTap={this.handleNewMessage}>
          </MenuItem>
        </Drawer>
				{(
					() => {
						if(this.state.currentView === 'DASHBOARD') {
							if(this.state.userRole === 'a') {
								return (<AdminDashboard/>)
							} else {
								return (<Dashboard onChangeView={this.handleCurrentView} uId={this.state.uId}/>)
							}
						} else if (this.state.currentView === 'SALE_FORM') {
							return (<SaleForm onChangeView={this.handleCurrentView} handleNewSale={this.handleNewSale}/>)
						} else if (this.state.currentView === 'NEW_VALIDATION') {
							return (<ValidationForm/>)
						}

					}	
					)()}
					</div>
					)}
				</div>
				</MuiThemeProvider>
				)
	}
}

export default MainApp;