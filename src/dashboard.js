import React, { Component } from 'react';
import * as firebase from 'firebase';
//Used fot arrays
/*class List extends Component {
  render() {
    var createItem = function(item) {
      return <li key={item.value}>{item.label}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
}*/

/*class List extends Component {
  render() {
  	return(
  		<ul>
	    {Object.keys(this.props.items).map(function(key){
	    	return <li key={key}>{this.props.items[key]}</li>;
	    }.bind(this))}
	    </ul>
    )
  }
}*/
//This is the same as the previous, but since is an arrow function we dont have to bind "this"
class List extends Component {
  render() {
  	return(
  		<ul>
	    {Object.keys(this.props.items).map(key => {
	    	return <li key={key}>{this.props.items[key]}</li>;
	    })}
	    </ul>
    )
  }
}

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: {value: 'one', label: 'One'},
	    };
	}

	componentDidMount() {
		console.log('Component mounted');
		console.log(this.props);
		console.log(this.props.uId);
		var dbRefLocalities = firebase.database().ref().child('localities');
		var dbRefSales = firebase.database().ref().child('sales/' + this.props.uId);
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
	}

	render() {
		return (
			<div>
				<h2>Dashboard :p</h2>
				<List items={this.state.items}/>
				<input type="button" onClick={this.props.onChangeView.bind(this,'SALE_FORM')} value="Complete form"/>
			</div>
		)
	}
}

export default Dashboard;