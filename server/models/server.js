const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Sockets = require('./sockets')
const cors = require('cors')
const path = require('path')

class Server {

  constructor() {

    this.app = express();
    this.port = process.env.PORT;

    //HTTP Server
    this.server = http.createServer(this.app);

    //configuracion sockets
    this.io = socketio(this.server, {
     /*config */
    });
  }
  middlewares() {
      // Desplegar el directorio público
      this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

      // CORS
      this.app.use( cors() );

  }
  socketsConifiguration(){
    const sockets =  new Sockets(this.io)
    sockets.socketsEvents()
  }
  execute() {
    //initialize middlewares
    this.middlewares();
    //initialize sockets
    this.socketsConifiguration()
    //server start listen
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
