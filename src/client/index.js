import 'babel/polyfill';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

render(
  <Router history={createBrowserHistory()}>{routes}</Router>,
  document.getElementById('app'));
