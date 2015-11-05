import 'babel/polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import Html from 'client/components/html';
import routes from 'client/routes';
import getPageType from 'lib/getPageType';

const ENV = process.env.NODE_ENV || 'development';
const PORT = 3000;
const ASSETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
const IS_DEBUG = ENV === 'development';

var server = express();

if (IS_DEBUG) {
  server.use(express.static(path.join(__dirname, 'public')));
}

server.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res
        .status(200).send(
          '<!doctype html>' +
          ReactDOM.renderToStaticMarkup(<Html
            pageType={getPageType(req.url)}
            bundle={ASSETS.main}
            body={ReactDOM.renderToString(<RoutingContext {...renderProps} />)}
          />));
    } else {
      res.status(404).send('Not found');
    }
  });
});

server.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log('The server is running at port ' + PORT);
});
