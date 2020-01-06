const path = require('path');
const express = require('express');
const mongoose = require('mongoose');


//importing routers
const login = require('./router/loginRouter')
const signup = require('./router/signupRouter')

const db = require('./config/keys').MONGO_URI
const app = express();
const PORT = 3000;

//connect to mongoDB
console.log('running server.js')
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'rePark'
  })
  .then(() => console.log('Connected to Mongo DB....'))
  .catch(err => console.log(err));

/**
 * handle parsing request body
 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * handle requests for static files
 */
app.use('/assets', express.static(path.join(__dirname, './assets')));

/**
 * define route handlers
 */
// if production
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}


/**
 * root
 */
// respond with main app
app.get('/*',
  (req, res) => {res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))} );

/**
 * login
 */
// respond with login router
app.use('/login', login);

/**
 * sign up
 */
// respond with signup router
app.use('/signup', signup);

/**
 * Authorized routes
 */
app.get('/index',
        (req, res) => {
          res.render('./../client/index.html', {});
        })

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`)
})

module.exports = app;
