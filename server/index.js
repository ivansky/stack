require('dotenv').config();

const proxyMiddleware = require('http-proxy-middleware');
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

const API_SERVER_URL = process.env.API_SERVER_URL || 'http://api.stackexchange.com/2.2';
const STATIC_SERVER_URL = process.env.STATIC_SERVER_URL || 'http://front:3031';

const STACKEXCHANGE_CLIENT_ID = process.env.STACKEXCHANGE_CLIENT_ID;
const STACKEXCHANGE_CLIENT_SECRET = process.env.STACKEXCHANGE_CLIENT_SECRET;
const STACKEXCHANGE_APPS_KEY = process.env.STACKEXCHANGE_APPS_KEY;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://db/stack';

mongoose.connect(MONGODB_URI);

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
    callbackURL: `${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}/api/auth/stack/callback`,
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

const authRouter = express.Router();

authRouter
  .get('/stack', passport.authenticate('stack-exchange'))
  .get('/stack/callback', passport.authenticate('stack-exchange', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
  .get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({
      code: 401,
      message: 'Unauthorized',
    });
  }, (req, res) => {
    res.json({
      ...req.user,
      passwordHash: undefined,
    });
  })
  .get('/logout', (req, res) => {
    req.logout();
    res.end(200);
  });

app.use('/api/auth', authRouter);

if (API_SERVER_URL) {
  app.use('/api', proxyMiddleware({
    target: API_SERVER_URL,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api': '', // rewrite path
    },
  }));
}

// Production image will use nginx routing
if (NODE_ENV !== 'production' && STATIC_SERVER_URL) {
  // Proxy webpack-dev-server front only for development
  app.use(proxyMiddleware({
    target: STATIC_SERVER_URL,
    secure: false,
    changeOrigin: true,
    // To turn Webpack ws
    ws: true,
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
