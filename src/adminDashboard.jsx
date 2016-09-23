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
      /*sales: [],
      done1: false,
      done2: false*/
    };
  }

  handleDoneState(index) {
    console.log('done state handler called');
    console.log(index);
    let originalTicket = {
      company: 'Dalta',
      flightNo: '0990',
      departure: {
        airport: 'LAS',
        time: '2016-08-21T10:00:00.000Z'
      },
      arrival: {
        airport: 'MIA',
        time: '2016-08-21T14:41:10.000Z'
      },
      codeshare: [
        {company:'GL', flightNo:'9840'},
        {company:'TM', flightNo:'5010'}
      ]
    };
    let newTicket = update(originalTicket, {
                      arrival: {
                        airport: {$set: 'MCO'}
                      }
                    });
    console.log(newTicket);
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
          {this.props.sales.map( (row, index) => (
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
    this.handleDoneState = this.handleDoneState.bind(this);
		this.state = {
			sales: [],
      done1: false,
      done2: false
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

  handleDoneState(i) {
    console.log('> done state handler called');
    console.log(i);
    switch (i) {
      case 1:
        this.setState({
          done1: !this.state.done1
        });
        break;
      case 2:
        this.setState({
          done2: !this.state.done2
        });
        break;
    }
  }

	render() {
		return (
			<div>
				<h2>Admin Dashboard</h2>
        <Toggle toggled={this.state.done1} onToggle={() => this.handleDoneState(1)}/>
        <Toggle toggled={this.state.done2} onToggle={() => this.handleDoneState(2)}/>
				<SalesTable sales={this.state.sales}/>
			</div>
		)
	}
}

export default AdminDashboard;