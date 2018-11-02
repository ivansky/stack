require('dotenv').config();

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const proxyMiddleware = require('http-proxy-middleware');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const StackExchangeStrategy = require('passport-stack-exchange');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);

const NODE_ENV = process.env.NODE_ENV;
const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL || 'http';
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3030;
const SERVER_SESSION_SECRET = process.env.SERVER_SESSION_SECRET || 'some_sesssion_secret';

const API_SERVER_URL = process.env.API_SERVER_URL || 'http://api.stackexchange.com/2.2';
const STATIC_SERVER_URL = process.env.STATIC_SERVER_URL || 'http://front:3031';
const MOCK = process.env.MOCK;

const STACKEXCHANGE_CLIENT_ID = process.env.STACKEXCHANGE_CLIENT_ID;
const STACKEXCHANGE_CLIENT_SECRET = process.env.STACKEXCHANGE_CLIENT_SECRET;
const STACKEXCHANGE_APPS_KEY = process.env.STACKEXCHANGE_APPS_KEY;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://db/stack';

const file_exists = (filename) => {
  return new Promise((resolve) => {
    fs.exists(filename, (exists) => {
      resolve(exists);
    })
  })
};

const get_file_content = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data.toString());
    });
  })
};

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

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId, (err, userObject) => {
    const user = userObject.toObject()
    done(err, user);
  });
});

passport.use(new StackExchangeStrategy({
    clientID: STACKEXCHANGE_CLIENT_ID,
    clientSecret: STACKEXCHANGE_CLIENT_SECRET,
    callbackURL: `${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}/api/auth/stack/callback`,
    stackAppsKey: STACKEXCHANGE_APPS_KEY,
    site: 'stackoverflow',
  },
  async (accessToken, refreshToken, profile, done) => {
    const {
      id: stackId,
      photos,
      displayName: name
    } = profile;

    const avatar = photos.length > 0 ? photos[0] : null;

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

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
   User.findOne({ email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }

      const hash = crypto.createHash('md5').update(password).digest('hex');

      if (user.passwordHash !== hash) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    });
  }
));

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  cookie : {
    maxAge: 3600000 // see below
  },
  secret: SERVER_SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session({ secret: SERVER_SESSION_SECRET }));

const authRouter = express.Router();

authRouter
  .post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  })
  .post('/logout', (req, res) => {
    req.logout();
    res.json({});
  })
  .post('/sign-up', async (req, res) => {
    const {
      email = null,
      password = null,
      name = null,
    } =  req.body;

    const errors = {};

    if (!email) {
      errors.email = 'Please, enter email';
    } else if (!EMAIL_REGEXP.test(email)) {
      errors.name = 'Email should be correct';
    }

    if (!password) {
      errors.password = 'Please, enter password';
    } else if (password.length < 3) {
      errors.password = 'Password should be at least 3 characters';
    }

    if (!name) {
      errors.name = 'Please, enter name';
    } else if (name.length < 3) {
      errors.name = 'Name should be at least 3 characters';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        code: 400,
        message: 'Sign-up Data Incorrect',
        errors,
      });
    } else {
      const passwordHash = crypto.createHash('md5').update(password).digest('hex');

      const user = new User({
        email,
        passwordHash,
        name,
      });

      await user.save();

      res.json({
        email,
        name,
      });
    }
  })
  .get('/stack', passport.authenticate('stack-exchange'))
  .get('/stack/callback', passport.authenticate('stack-exchange', { failureRedirect: '/auth/login' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
  .get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.json({
        ...req.user,
        passwordHash: undefined,
      });
    } else {
      res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      });
    }
  });

app.use('/api/auth', authRouter);

if (MOCK) {
  app.get('/api/search', async (req, res) => {
    const page = req.query.page;
    const filename = `${__dirname}/mock/questions-${page}.json`;

    const isExists = await file_exists(filename);

    if (!isExists) {
      res.status(404).send('Not found');
      return;
    }

    res.json(require(filename));
  });

  app.get('/api/users/:user_id/questions', async (req, res) => {
    const page = req.query.page;
    const filename = `${__dirname}/mock/user-questions-${page}.json`;

    const isExists = await file_exists(filename);

    if (!isExists) {
      res.status(404).send('Not found');
      return;
    }

    try {
      res.json(JSON.parse(await get_file_content(filename)));
    } catch (e) {
      res.status(500).json(e);
    }
  });

  app.get('/api/tags/:tag/questions', async (req, res) => {
    const page = req.query.page;
    const filename = `${__dirname}/mock/tag-questions-${page}.json`;

    const isExists = await file_exists(filename);

    if (!isExists) {
      res.status(404).send('Not found');
      return;
    }

    try {
      res.json(JSON.parse(await get_file_content(filename)));
    } catch (e) {
      res.status(500).json(e);
    }
  });

  app.get('/api/questions/:question_id', async (req, res) => {
    try {
      const questionId = parseInt(req.params.question_id);
      const map = JSON.parse(await get_file_content(`${__dirname}/mock/questions-map.json`));
      const question = map[`${questionId}`];

      if (question) {
        const responseBody = {
          items: [ question ],
        }
        res.json(responseBody);
      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {
      res.status(500).json(e);
    }
  });

  app.get('/api/questions/:question_id/answers', async (req, res) => {
    const filename = `${__dirname}/mock/answers.json`;
    const isExists = await file_exists(filename);

    if (!isExists) {
      res.status(404).send('Not found');
      return;
    }

    try {
      res.json(JSON.parse(await get_file_content(filename)));
    } catch (e) {
      res.status(500).json(e);
    }
  });
}

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
