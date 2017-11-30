// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


//define a broadcast function
wss.broadcast = function broadcast(data){
  wss.clients.forEach(function each(client){
    if (client.readyState === 1){
      client.send(data);
    }
  })
}

let global_id = [0];  //I decided not to use UUID.  I declate a global variable that increments on every new message
const colors = require('./colors.json');  //a json file with a bunch of colours!

wss.on('connection', (ws) => {
  console.log('Client connected.');
  wss.broadcast(JSON.stringify({counter: wss.clients.size}));

  let username = "Anonymous";
  let userColor = colors[Math.floor(Math.random() * colors.length)];

  ws.on('message', function incoming(message){
    message = JSON.parse(message);
    message.id = ++global_id[0];
    message.color = userColor;
    message.images = [];

    if (message.username === undefined){
      message.username = username;
    }

    if (message.content === undefined){
      // Messages don't have types: if there's no content then it will be a name change.
      // If I were going to add more features, it would be better to have a type property to each message
      if (username === message.username){
        return;
      };

      message.content = `${username} changed their name to ${message.username}.`
      username = message.username;
      message.username = ""; //system messages have no username
    } else {
      //-- normal message

      //check for images in the content
      let re = /https?:\/\/\S+\.(jpg|png|gif)/g;
      let match;
      while (match = re.exec(message.content)){ message.images.push(match[0]); }
      //remove image urls from message
      message.content = message.content.replace(re, '');
    }
    //broadcast the message
    wss.broadcast(JSON.stringify(message));
  })

  ws.on('close', () => {
    console.log('Client disconnected.');
    wss.broadcast(JSON.stringify({counter: wss.clients.size}));
  });
});
