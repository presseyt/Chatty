import React, {Component} from 'react';

class Nav extends Component{
  render(){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="counter"> {this.props.userCount} user{this.props.userCount > 1 ? 's' : ''} online</span>
      </nav>
    );
  }
}

export default Nav;