import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
			sales: []
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
	  dbRefSales.on('value', snap => {
	    console.log('>>>Sales');
        console.log(snap.val());
	    let data = snap.val();
        let salesArray = [];
        for (var prop in data) {
          salesArray.push(data[prop]);
        }
        console.table(salesArray);
	    this.setState({
	  	  sales: salesArray
	    });
	  });
	}

	render() {
		return (
			<div>
				<h2>Dashboard</h2>
				{/*<List items={this.state.items}/>*/}
				<Table>
		          <TableHeader 
		            displaySelectAll={false}
		            adjustForCheckbox={false}>
		            <TableRow>
		              <TableHeaderColumn colSpan="5" tooltip="My sales" style={{textAlign: 'center'}}>
		                My sales
		              </TableHeaderColumn>
		            </TableRow>
		            <TableRow>
		              {/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
		              <TableHeaderColumn>ID</TableHeaderColumn>
		              <TableHeaderColumn>Field1</TableHeaderColumn>
		              <TableHeaderColumn>Field2</TableHeaderColumn>
		              <TableHeaderColumn>Field3</TableHeaderColumn>
		              <TableHeaderColumn>Done</TableHeaderColumn>
		            </TableRow>
		          </TableHeader>
		          <TableBody displayRowCheckbox={false}>
		            {this.state.sales.map( (row, index) => (
		              <TableRow key={index}>
		                {/*<TableRowColumn>{index}</TableRowColumn>*/}
		                <TableRowColumn>{index}</TableRowColumn>
		                <TableRowColumn>{row.field1step1}</TableRowColumn>
		                <TableRowColumn>{row.field1step2}</TableRowColumn>
		                <TableRowColumn>{row.field1step3}</TableRowColumn>
		                <TableRowColumn>
		                  <Toggle toggled={row.done}/>
		                </TableRowColumn>
		              </TableRow>
		            ))}
		          </TableBody>
		        </Table>
		        <FloatingActionButton onClick={this.props.onChangeView.bind(this,'SALE_FORM')}>
			      <ContentAdd />
			    </FloatingActionButton>
			</div>
		)
	}
}

export default Dashboard;