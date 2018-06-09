import React, { Component } from 'react';
import {post} from './../lib/network';
import { browserHistory } from 'react-router';
import './../styles/login.css';

class Login extends Component {
  handleSubmit(event){
    event.preventDefault();
    post('/login', {
        username: this.username.value, 
        password: this.password.value
    }).then((data) => {
      browserHistory.push('/');
    }).catch((xhr, status, data) => {
      console.log(xhr, status, data);
    })
  }

  render() {
    
    return (
      <div>
        <h2>Login!</h2>
        <form name="form-login" className="form-login" onSubmit={(e) => this.handleSubmit(e)}>
          <input ref={(ref) => this.username = ref} placeholder="username" type="text" />
          <input ref={(ref) => this.password = ref} placeholder="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
