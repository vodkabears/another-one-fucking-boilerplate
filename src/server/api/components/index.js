import { Router } from 'express';
import TodoAPI from './todo';
import PageTypeWelcomeAPI from './page-type-welcome';
import PageTypeTodoExampleAPI from './page-type-todo-example';

let API = new Router();

API.use('/Todo', TodoAPI);
API.use('/PageTypeWelcome', PageTypeWelcomeAPI);
API.use('/PageTypeTodoExample', PageTypeTodoExampleAPI);

export default API;
