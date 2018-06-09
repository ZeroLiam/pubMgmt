import React, { Component } from 'react';
import { Link } from 'react-router';
import './../App.css';

class HeaderBar extends Component {
  getAccess(){
      if(this.props.credentials != null){
        return <Link to="/logout">Logout</Link>;
      }else{
        return <Link to="/login">Login</Link>;
      }
   }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link to={this.props.credentials != null ? '/' : '/login'}>{this.props.title}</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li role="presentation"> <Link to={this.props.credentials != null ? '/' : '/login'}>Index</Link> </li>
              <li role="presentation"> {this.getAccess()} </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderBar;
