

import React, {Component} from 'react';

class Message extends Component {
  render() {
    let images = this.props.message.images.map(
      imageURL => `<br><img src="${imageURL}" style="color:${this.props.message.color};"></img>`
    ).join('<br>');

    return this.props.message.username ?
    (
      <div className="message">
        <span className="message-username" style={{color: this.props.message.color}}>
          {this.props.message.username}
        </span>
        <span className="message-content">
          {this.props.message.content}
          <span dangerouslySetInnerHTML ={{__html: images}}></span>
        </span>
      </div>
    ) : (
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
}

export default Message;
