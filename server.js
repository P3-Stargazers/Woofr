require('dotenv').config() // looks for .env ; process.env gets it's values

const express = require('express')
const app = express()
const path = require('path')
const apiRouter = require('./app/router')
const PORT = process.env.PORT || 8080
const orm = require('./app/db/orm.mongoose')
const mongoose = require('mongoose');
const Msg = require('./app/db/models/messages')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoDB = 'mongodb+srv://dbUser:dbUserPassword@cluster0.b59lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
}).catch(err => console.log(err))

const API_URL = process.env.NODE_ENV === 'production' ?
   'https://everestcart.herokuapp.com' : `http://localhost:${PORT}`
// production uses REACT production-build content
const STATIC_PATH = process.env.NODE_ENV === 'production' ?
   path.join('client', 'build') : path.join('client', 'public')

if (!process.env.MONGODB_URI || !process.env.SESSION_SECRET) {
   console.log('*ERROR* You need a .env file (with MONGODB_URI,SESSION_SECRET, and other oAuth entries...)')
   process.exit()
}

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// static paths (ex. assets, js, images, etc) served automatically from:
app.use(express.static(STATIC_PATH))

// all our RESTful API routes come from
apiRouter(app, API_URL, STATIC_PATH)

if (process.env.NODE_ENV === 'production') {
   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './client/build/index.html'))
   })
   console.log('!! Be sure to run "npm run build" to prepare production react code!')
}

io.on('connection', (socket) => {
   Msg.find().then(result => {
      socket.emit('output-messages', result)
   })

   console.log(socket.id)
   console.log('a user connected');

   socket.emit('message', 'Hello world');

   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
   socket.on('chatmessage', msg => {
      const message = new Msg({ msg });
      message.save().then(() => {
         io.emit('message', msg)
      })
   })
});

server.listen(PORT, function () {
   console.log(`Serving app on: ${API_URL} (port: ${PORT})`)
})