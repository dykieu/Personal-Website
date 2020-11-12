const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const app = express();

// Stores User Session
const session = require('express-session');
const storeSession = require('connect-mongo')(session);

// Database access
const mongoUrl = `MONGODB URL HERE`;

app.use(helmet());
app.use(compression());

// Port for hosting
app.set('port', (process.env.PORT || 8080));

// Parser for incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to DB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: `DB NAME HERE`
})
.then(() => {
  console.log('Connection to database: successful');
}).catch((error) => console.error(error));

// Logs errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// use sessions for tracking logins
app.use(session({
  secret: `project name`,
  resave: true,
  saveUninitialized: false,
  store: new storeSession({
    mongooseConnection: db
  })
}));

// To check that user is logged in (for webpage layout)
app.use((req, res, next) => {
  res.locals.loggedin = req.session.userId;
  next();
});

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
const routes = require('./routes/index');
app.use('/', routes);

// catch 404 then forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');

  err.status = 404;
  next(err);
});

//Error handler function
//Define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/', (request, response) => {
  let result = 'App is running';
  response.send(result);
}).listen(app.get('port'), () => {
  console.log(`Visit application here: http://localhost:${app.get('port')}`);
});
