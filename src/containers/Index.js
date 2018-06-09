import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './../App.css';
import HeaderBar from './../components/HeaderBar.js';
import {get} from './../lib/network';
import _ from 'lodash';

class Index extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: false
    }
  }

  componentDidMount(){

    get("/users/me").then((data) => {
      console.info("I'm logged in");
      this.setState({currentUser: _.get(data, 'data.0')});
      
    }).catch((err) => {
      console.info("Final", err);

      this.setState({currentUser: null});
      browserHistory.push('/login');
    })
  }

  render() {

    return (
      <div>
        <HeaderBar title="Publisher Management" credentials={this.state.currentUser} />
        {this.props.children}
      </div>
    );
  }
}

export default Index;
