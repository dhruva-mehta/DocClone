const express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser')
import passport from './passport'
import auth from './auth'
import routes from './routes'
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const app = express();
<<<<<<< HEAD
const server = http.Server(app);
import socketio from 'socket.io';
const io = socketio(server);

=======
const Doc = require('../models/models').Doc
>>>>>>> master

app.use(session({ secret: "tractor",
store: new MongoStore({mongooseConnection: require('mongoose').connection}),
})); //secret strin g is used to hash the cookie
app.use(bodyParser.urlencoded({ extended: false })); //doesn't matter if the body is json or not
app.use(bodyParser.json()) // turning post requests into json objects
app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport)) //used at every single route
app.use('/', routes) //used at every single route
<<<<<<< HEAD
socket.on('connected', )
=======

//web sockets!!
io.on('connection', socket => {
  socket.on("sync", data => {
    Doc.findByIdAndUpdate(data.id, {content: data.content})
    .then(doc => {
      io.to(data.id).emit("sync", data.content)
    })
  })
})
>>>>>>> master

const PORT = process.env.PORT || 3000;
app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
