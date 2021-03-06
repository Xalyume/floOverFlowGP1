const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sessionSecret } = require('./config/index')
const { restoreUser } = require('./auth')

// Route Handlers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signupRouter = require('./routes/signup');
const questionsRouter = require('./routes/questions');
const questionVotesRouter = require('./routes/questionVotes');
const searchRouter = require('./routes/search');
const answerVotesRouter = require('./routes/answerVotes');
const apiRouter = require('./routes/api');
const answersRouter = require('./routes/answers');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, 'public')));


// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    name: 'flo-overflow.sid',
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/questions',questionsRouter)
app.use('/questions', questionVotesRouter)
app.use('/questions',questionsRouter);
app.use('/search',searchRouter);
app.use('/answers', answerVotesRouter);
app.use('/api', apiRouter);
app.use('', answersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
