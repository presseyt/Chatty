import React, {Component} from 'react';

import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import Nav from './Nav.jsx'

class App extends Component {
  constructor(){
    super();
    this.state = {
      messages: [],
      userCount: 1
    };
  }

  socket;  //define this.socket

  componentDidMount(){
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => console.log('connected to server');
    this.socket.onclose = () => console.error('connection closed!');

    this.socket.onmessage = messageEvent => {
      let message = JSON.parse(messageEvent.data);
      if (message.content !== undefined){
        this.setState(
          {messages: this.state.messages.concat(message)}
        );
      } else {
        if (message.counter)
          this.setState({userCount: message.counter});
      }
    }
  }

  render() {
    return (
      <div>
        <Nav
          userCount={this.state.userCount}
        />
        <MessageList
          MessageArray={this.state.messages}
        />
        <ChatBar
          onPost={this.onPost}
          onName={this.onName}
        />
      </div>
    );
  }

  onName = (newUser) =>{
    if(this.socket)
      this.socket.send(JSON.stringify({username: newUser}));
  }

  onPost = (content) =>{
    if(this.socket)
      this.socket.send(JSON.stringify({content}));
  }

}
export default App;




