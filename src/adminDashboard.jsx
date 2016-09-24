import React, { Component } from 'react';
import update from 'react-addons-update';
import * as firebase from 'firebase';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

class SalesTable extends Component {
  constructor(props){
    super(props);
    this.handleDoneState = this.handleDoneState.bind(this);
    this.state = {
      sales: []
    };
  }

  //Updates curren component state when parent props changes
  componentWillReceiveProps(nextProps) {
      this.setState({ sales: nextProps.sales });
  }

  handleDoneState(index) {
    let updatedSale = update(this.state.sales, {[index]: {done: {$set: true}}});
    this.setState({sales: updatedSale});
  }

  render() {
    return (
      <Table>
        <TableHeader 
          displaySelectAll={false}
          adjustForCheckbox={false}>
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
                <Toggle toggled={row.done} onToggle={() => this.handleDoneState(index)}/>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

class AdminDashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			sales: []
	  };
	}

	componentDidMount() {
		var dbRefAllSales = firebase.database().ref().child('sales');
		dbRefAllSales.on('value', snap => {
			console.log('>>>All Sales');
			console.log(snap.val());
      let data = snap.val();
      let salesArray = [];
      for (var prop in data) {
        for (var prop1 in data[prop]) {
          salesArray.push(data[prop][prop1]);
        }
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
				<SalesTable sales={this.state.sales}/>
			</div>
		)
	}
}

export default AdminDashboard;