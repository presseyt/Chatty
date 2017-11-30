import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
     user: "",
     message: ""
    };
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.user}
          onChange = {this.updateName}
          onKeyDown = {this.submitName}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange = {this.updateMessage}
          onKeyDown = {this.submitPost}
        />
      </footer>
    );
  }

  submitPost = (e) => {
    if (e.key === 'Enter' && this.state.message){
      this.props.onPost(this.state.message);
      this.setState({message:""});
    }
  }

  submitName = (e) => {
    if (e.key === 'Enter' && this.state.user){
      this.props.onName(this.state.user);
    }
  }

  updateMessage = (e) => {
    this.setState({message: e.target.value});
  }

  updateName = (e) => {
    this.setState({user: e.target.value});
  }
}
export default ChatBar;
