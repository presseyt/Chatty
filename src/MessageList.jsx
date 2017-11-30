import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render(){
    let messageArray = this.props.MessageArray.map(message =>
      <Message message={message} key={message.id} />
    );

    return (
      <main className="messages">
        {messageArray}
      </main>
    );
  }
}

export default MessageList;