require('dotenv').config();

const proxy = require('http-proxy-middleware');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const StackExchangeStrategy = require('passport-stack-exchange');
const LocalStrategy = require('passport-local').Strategy;

const NODE_ENV = process.env.NODE_ENV;
const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL || 'http';
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3030;
const SERVER_SESSION_SECRET = process.env.SERVER_SESSION_SECRET || 'some_sesssion_secret';

const API_SERVER_URL = process.env.API_SERVER_URL;
const STATIC_SERVER_URL = process.env.STATIC_SERVER_URL || 'http://front:3031/';

const STACKEXCHANGE_CLIENT_ID = process.env.STACKEXCHANGE_CLIENT_ID;
const STACKEXCHANGE_CLIENT_SECRET = process.env.STACKEXCHANGE_CLIENT_SECRET;
const STACKEXCHANGE_APPS_KEY = process.env.STACKEXCHANGE_APPS_KEY;

mongoose.connect('mongodb://db/stack');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  stackId: Number,
  email: String,
  name: String,
  avatar: String,
  passwordHash: String,
});

const User = mongoose.model('User', userSchema);

passport.use(new StackExchangeStrategy({
    clientID: STACKEXCHANGE_CLIENT_ID,
    clientSecret: STACKEXCHANGE_CLIENT_SECRET,
    callbackURL: `${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}/auth/stack/callback`,
    stackAppsKey: STACKEXCHANGE_APPS_KEY,
    site: 'stackoverflow',
  },
  async (accessToken, refreshToken, profile, done) => {
    const {
      user_id: stackId,
      profile_image: avatar,
      display_name: name
    } = profile;

    try {
      let user = await User.findOne({ stackId });

      if (!user) {
        user = new User({
          stackId,
          email: '',
          name,
          avatar,
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

const app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: SERVER_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/stack', passport.authenticate('stack-exchange'));

app.get(
  '/api/auth/stack/callback',
  passport.authenticate('stack-exchange', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/api/auth/profile', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send('Unauthorized');
}, (req, res) => {
  res.json({
    ...req.user,
    passwordHash: undefined,
  });
});

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.end(200);
});

if (API_SERVER_URL) {
  app.use('/api', proxy({
    target: API_SERVER_URL,
    secure: false,
    changeOrigin: true,
  }));
}

if (NODE_ENV !== 'production' && STATIC_SERVER_URL) {
  // Proxy webpack-dev-server front only for development
  app.use(proxy({
    target: STATIC_SERVER_URL,
    secure: false,
    changeOrigin: true,
  }));
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login')
}

app.listen(SERVER_PORT);

if (NODE_ENV !== 'production') {
  console.log(`
  Now server is listening ${SERVER_PORT} port\n
  You can navigate ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}/
`);
}
