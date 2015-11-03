import 'babel/polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom/server';
import Html from 'client/components/html';
import PageTypeWelcome from 'client/components/page/mods/type/welcome';
import PageTypeTodoExample from 'client/components/page/mods/type/todo-example';

const ENV = process.env.NODE_ENV || 'development';
const PORT = 3000;
const ASSETS = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
const IS_DEBUG = ENV === 'development';

var server = express();

if (IS_DEBUG) {
  server.use(express.static(path.join(__dirname, 'public')));
}

server.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<!doctype html>' +
      ReactDOM.renderToStaticMarkup(<Html
        pageType="welcome" bundle={ASSETS.main} body={ReactDOM.renderToString(<PageTypeWelcome />)} />));
});

server.get('/examples/todo', (req, res) => {
  res
    .status(200)
    .send(
      '<!doctype html>' +
      ReactDOM.renderToStaticMarkup(<Html
        pageType="examples-todo" bundle={ASSETS.main} body={ReactDOM.renderToString(<PageTypeTodoExample />)} />));
});

server.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log('The server is running at port ' + PORT);
});
