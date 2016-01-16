import { Router } from 'express';
import TodosAPI from './todos';
import PageTypeWelcomeAPI from './page-type-welcome';
import PageTypeTodosExampleAPI from './page-type-todos-example';

let API = new Router();

API.use('/Todos', TodosAPI);
API.use('/PageTypeWelcome', PageTypeWelcomeAPI);
API.use('/PageTypeTodosExample', PageTypeTodosExampleAPI);

export default API;
