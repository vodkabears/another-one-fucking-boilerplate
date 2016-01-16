import { Route, IndexRoute } from 'react-router';
import PageType404 from './components/page/mods/type/404';
import PageTypeWelcome from './components/page/mods/type/welcome';
import PageTypeTodosExample from './components/page/mods/type/todos-example';

export default (
  <Route path="/">
    <IndexRoute component={PageTypeWelcome} />
    <Route path="examples/todos(/:state)" component={PageTypeTodosExample} />
    <Route path="*" component={PageType404} />
  </Route>
);
