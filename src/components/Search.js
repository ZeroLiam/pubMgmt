import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';
import fuzzy from 'fuzzy';
import './../styles/search.css';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      showResults: false,
      results: [],
      filteredId: ''
    }

    this.onClearSearch = this.onClearSearch.bind(this);
  }

  onListChange(e){

    let value = e.target.value;
    let options = {
      extract: (el) => el._id
    };
    let filtered;

    if(!_.isEmpty(e.target.value)){
          filtered = fuzzy.filter(value, this.props.list, options);
          this.setState(prevState => {
            prevState.results.length = 0;
            _.map(filtered, (el, id)=> prevState.results.push(el.original));
            prevState.showResults = true;

            return prevState;
          })
    }else{
      this.setState(prevState => {
        prevState.results.length = 0;
        prevState.showResults = false;
        this.props.onValueChange(prevState.results);

        return prevState;
      });
    }

  }

  onClickSearch(evt){
    let chosen = _.filter(this.state.results, {_id: evt.target.innerHTML});

    if(!_.isEmpty(chosen)){
      this.props.onValueChange(chosen);
    }else{
      this.props.onValueChange(this.state.results);
    }


    this.setState(prevState =>{
      prevState.showResults = false;

      return prevState;
    });
  }

  onClearSearch(evt){
    this.setState((prevState, props) => {
      prevState.results = [];
      prevState.showResults = false;
      this.props.onValueChange(prevState.results);
      this.refs.searchbox.value = '';

      return prevState;
    });

  }

  resultBox(list){
      return (
          <div className='result-box'>
            <ul>
              {_.map(list, (arr, id)=> {
                return <li key={id} tabIndex={id} className="result-item" onClick={(...args)=> this.onClickSearch(...args)}>{arr._id}</li>
              })}
            </ul>
          </div>
      );
  }

  render() {
    
    return (
      <div className="search-component">
          <FormGroup>
            <InputGroup>
              <input className="search-input" type="text" placeholder="Search" onChange={(...args) => this.onListChange(...args)} onKeyDown={(...args)=> this.onClickSearch(...args)} ref="searchbox" />
              <Button className="btn-search" bsStyle="info" type="submit" onClick={(...args)=> this.onClickSearch(...args)}><i className="fa fa-search"></i></Button> 
              <Button className="btn-search" bsStyle="info" onClick={this.onClearSearch}>Clear Search</Button> 
            </InputGroup>
          </FormGroup>
          {this.state.showResults ? this.resultBox(this.state.results) : ''}
      </div>
    );
  }
}

export default Search;
