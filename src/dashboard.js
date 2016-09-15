import React, { Component } from 'react';
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
	    };
	}

	render() {
		return (
			<div>
				<h2>Dashboard :p</h2>
				<List items={this.props.items}/>
				<input type="button" onClick={this.props.onChangeView.bind(this,'SALE_FORM')} value="Complete form"/>
			</div>
		)
	}
}

export default Dashboard;