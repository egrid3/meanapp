const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);
// on connection
mongoose.connection.on('connected', () => {
  console.log('We have a (love) connection to database '+config.database+'!');
});
// on error
mongoose.connection.on('error', (err) => {
  console.log('Somthin\' messed up wit the database! - error: '+err);
});

const app = express();
const users = require('./routes/users');

// port number
const port = 3034;

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (req, res) => {
  res.send('Somethin\' got jacked up! - Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// start server
app.listen(port, () => {
  console.log('All engines are a go on port: '+port+'!');
});