import 'babel/polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom/server';
import Html from 'client/components/html';
import Page from 'client/components/page';

const PORT = process.env.PORT || 3000;
const ASSETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));

var server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<!doctype html>' +
      ReactDOM.renderToStaticMarkup(<Html bundle={ASSETS.main} body={ReactDOM.renderToString(<Page />)} />));
});

server.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log('The server is running at port ' + PORT);
});
