import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import PageType404 from './components/page/mods/type/404';
import PageTypeWelcome from './components/page/mods/type/welcome';
import PageTypeTodoExample from './components/page/mods/type/todo-example';

export default (
  <Route path="/">
    <IndexRoute component={PageTypeWelcome} />
    <Route path="examples/todo" component={PageTypeTodoExample} />
    <Route path="*" component={PageType404} />
  </Route>
);
