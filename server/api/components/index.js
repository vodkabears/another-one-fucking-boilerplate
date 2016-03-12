import { Router } from 'express';
import TodosAPI from './todos';
import PageTypeTodosExampleAPI from './page-type-todos-example';

let API = new Router();

API.use('/Todos', TodosAPI);
API.use('/PageTypeTodosExample', PageTypeTodosExampleAPI);

export default API;
