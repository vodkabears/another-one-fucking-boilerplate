import 'babel/polyfill';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import getPageType from 'lib/getPageType';
import styles from './components/html/styles.css';

let history = createBrowserHistory();

history.listen(location => {
  let className = styles[getPageType(location.pathname)] || '';

  document.body.className = className;
});

render(
  <Router history={history}>{routes}</Router>,
  document.getElementById('app'));
