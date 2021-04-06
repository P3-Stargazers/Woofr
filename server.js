require('dotenv').config() // looks for .env ; process.env gets it's values

const path = require('path')
const express = require('express')
const apiRouter = require('./app/router')
const app = express()
const orm = require('./app/db/orm.mongoose')
// const io = require('socket.io')(http)

const PORT = process.env.PORT || 8080
const API_URL = process.env.NODE_ENV === 'production' ?
   'https://powerful-wave-64998.herokuapp.com' : `http://localhost:${PORT}`
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

// **OPTIONAL** If your REACT routing allows non-standard paths (ex. fake paths for React-Router)
// THEN you need to enable this for server-side serving to work
if (process.env.NODE_ENV === 'production') {
   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './client/build/index.html'))
   })
   console.log('!! Be sure to run "npm run build" to prepare production react code!')
}

// io.on('connection', socket => {
//    socket.on('message', ({ name, message }) => {
//       io.emit('message', { name, message })
//    })
// })

// seed database (if needed)
// orm.seedDatabase()

// http.listen(4000, function () {
//    console.log(`Messaging listening on 4000`)
// })

app.listen(PORT, function () {
   console.log(`Serving app on: ${API_URL} (port: ${PORT})`)
})