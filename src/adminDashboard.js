import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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

const TableExampleSimple = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>Randal White</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>3</TableRowColumn>
        <TableRowColumn>Stephanie Sanders</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>4</TableRowColumn>
        <TableRowColumn>Steve Brown</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

class AdminDashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			sales: {},
	    };
	}

	componentDidMount() {
		var dbRefAllSales = firebase.database().ref().child('sales');
		dbRefAllSales.on('value', snap => {
			console.log('>>>All Sales');
			console.log(snap.val());
			this.setState({
				sales: snap.val()
			});
		});
	}

	render() {
		return (
			<div>
				<h2>Admin Dashboard</h2>
				<TableExampleSimple/>
				<input type="button" onClick={this.props.onChangeView.bind(this,'SALE_FORM')} value="Complete form"/>
			</div>
		)
	}
}

export default AdminDashboard;