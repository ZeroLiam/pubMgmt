import React, { Component } from 'react';
import { get } from './../lib/network';
import './../styles/login.css';

class Logout extends Component {

  componentDidMount(event){
    get("/logout").then((response) => {
      console.info("Logged Out - Publishers");
    }).catch((err) => {
      console.info("Final", err);
    })
  }

  render() {
    
    return (
      <div>
        <h3>You just logged out. Buh-bye!</h3>
      </div>
    );
  }
}

export default Logout;
