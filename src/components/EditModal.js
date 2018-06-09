import React, { Component } from 'react';
import { DropdownButton, MenuItem, FormGroup, InputGroup, Button, Modal } from 'react-bootstrap';
import update from 'immutability-helper';
import _ from 'lodash';
import './../styles/modal.css';

class EditModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      bothObj: props.objID,
      ecpm: ['7x7', '2x2', '5x5', '300x250'],
      selected: '',
      missing: []
    }
  }

 componentWillReceiveProps(newProps) {    
    this.setState(prevState => {
      prevState.bothObj = newProps.objID;
      return prevState;
    });
 }

  showData(data){
    if(data.revenue_share !== undefined){
          return (
          <div>
              {_.map(data.revenue_share.both, (ecpm, key) => {
                return (
                    <div key={key} className="inputContent" ref={"inputContent_" + key}>
                        <label>{key}:</label> <input type="text" name={key} placeholder={ecpm} ref={key} />
                    </div>
                );
              })}
          </div>
      );
    }
  }

  saveModal(evt, id){
    console.log(this.state.bothObj);

    if(this.props.objID.revenue_share !== undefined){
        _.map(Object.keys(this.refs), (field, key)=>{
            this.state.bothObj = update(this.state.bothObj, { [field]: {$set: parseFloat(this.refs[field].value == '' ? this.props.objID.revenue_share.both[field] : this.refs[field].value)} });
          });
    }

    this.props.saveModal(id, this.state.bothObj.revenue_share.both);
    this.props.closeModal();
  }

  onSelectValue(evt){
    this.setState(prevState => {
      prevState.selected = evt;

      return prevState;
    })
  }

  onAddFields(ecpm, amt){
    if((ecpm == '' && amt == '') || ecpm == '' || amt == ''){
      console.info("FIELDS ARE EMPTY!!!");
    }else{
      console.log("Coming from AddFields (ecpm) : ", ecpm);
      console.log("Coming from AddFields (amt) : ", amt);

      if(this.state.bothObj.revenue_share !== undefined){
        _.map(this.state.bothObj.revenue_share.both, (field, key)=>{

          if(ecpm != key){
            this.setState(prevState => {
              prevState.bothObj.revenue_share.both[ecpm] = parseFloat(amt);
              return prevState; 
            });
            this.forceUpdate();
          }
        });
      }
    }

  }

  missingFields(data){

    //See if our publisher is missing some fields
    let arr = [];
    _.map(data, (el, i)=> arr.push(i));
    let missing = _.xor(this.state.ecpm, arr);
    
    if(missing.length > 0){
      return (
        <div className="missing-field">
          <FormGroup>
              <InputGroup>
                <DropdownButton bsStyle="info" title={this.state.selected == '' ? "Select new CPM" : this.state.selected} id="add_cpm" className="add-group" onSelect={(...args) => this.onSelectValue(...args)}>
                  {_.map(missing, (el, i) => {
                    return (
                      <MenuItem key={i} eventKey={el}>{el}</MenuItem>
                    );
                  })}
                </DropdownButton>
                <input className="cpm-input" type="text" placeholder="ecpm amount" ref="newamount" />
                <Button className="btn-add-cpm add-group" bsStyle="primary" onClick={(...args) => this.onAddFields(this.state.selected, this.refs.newamount.value)}> Add CPM</Button> 
                </InputGroup>
            </FormGroup>
        </div>
      );
    }else{
      return '';
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.openModal} onHide={this.props.closeModal} >
          <Modal.Header closeButton>
            <Modal.Title>Edit Revenue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="name-title">{this.props.objID._id}</h3>
            <p>Empty fields will keep their old values.</p>
              {this.showData(this.state.bothObj)}
              {this.state.bothObj.revenue_share !== undefined ? this.missingFields(this.state.bothObj.revenue_share.both) : ''}
             
          </Modal.Body>
          <Modal.Footer>
              <Button bsStyle="primary" onClick={(...args) => this.saveModal(this, this.props.objID._id)}>Save Edit</Button>
              <Button bsStyle="default" onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default EditModal;
