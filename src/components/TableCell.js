import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

class TableCell extends Component {
  renderRow(){

  	switch(this.props.markupType){
  		case 'th':
  			return <th> {this.props.topic} </th>;
  			break;
  		case 'td-obj':
  			return <td> {_.map(this.props.topic, (list, id) => <p key={id}> {id} : {list} </p> )} </td>;
  			break;
  		case 'Button':
  			return <td> <Button bsStyle={this.props.btnStyle} onClick={(...args) => this.props.onSelectItem(this, this.props.topic)}> {this.props.title} </Button> </td>;
  			break;
  		default:
  			return <td> {this.props.topic} </td>;
  			break;
  	}
  }

  render() {
      return this.renderRow();
  }
}

export default TableCell;