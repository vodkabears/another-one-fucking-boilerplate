import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import session from 'express-session';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import createRedisStore from 'connect-redis';
import { MongoClient } from 'mongodb';
import { match, RoutingContext } from 'react-router';
import Html from 'client/components/html';
import routes from 'client/routes';
import API from './api';
import providers from './providers';

const ENV = process.env.NODE_ENV || 'development';
const PORT = 3000;
const YEAR = 1000 * 60 * 60 * 24 * 365;
const ASSETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
const IS_DEBUG = ENV === 'development';
const MONGODB_URL = 'mongodb://localhost:27017/boilerplate';
const REDIS_SETTINGS = {
  host: 'localhost',
  port: 6379
};
const SESSION_SETTINGS = {
  name: 'sid',
  store: new (createRedisStore(session))(REDIS_SETTINGS),
  proxy: true,
  resave: false,
  secret: 'Boilerplate',
  cookie: { maxAge: YEAR },
  saveUninitialized: true
};

let server = express();
let mongoConnection;

if (IS_DEBUG) {
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(session(SESSION_SETTINGS));
} else {
  server.use(session(Object.assign({}, SESSION_SETTINGS, {
    cookie: { secure: true, maxAge: YEAR }
  })));
}

server.use((req, res, next) => {
  if (!mongoConnection) {
    mongoConnection = MongoClient.connect(MONGODB_URL);
  }

  mongoConnection
    .then(db => {
      req.db = db;
      next();
    })
    .catch(err => {
      mongoConnection = null;
      next(err);
    });
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', API);

server.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let page = renderProps.components[1];
      let pageName = page.name;
      let provider = providers[pageName];
      let loadPage = function(data = {}) {
        res
          .status(200).send(
            '<!doctype html>' +
            ReactDOM.renderToStaticMarkup(<Html
              data={data}
              bundle={ASSETS.main}
              body={ReactDOM.renderToString(<RoutingContext {...renderProps} />)}
            />));
      };

      req.query = renderProps.location.query;
      req.params = renderProps.params;
      req.pageName = pageName;

      provider ?
        provider(req).then(data => {
          let pageData = data[pageName];
          let initialDefaultProps = page.defaultProps;

          page.defaultProps = Object.assign({}, initialDefaultProps, pageData);
          loadPage(pageData);
          page.defaultProps = initialDefaultProps;
        }) : loadPage();
    }
  });
});

server.listen(PORT, () => {
  console.log('The server is running at port ' + PORT); // eslint-disable-line no-console
});
