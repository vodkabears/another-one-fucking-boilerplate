import { Router } from 'express';
import pageTypeTodoExampleProvider from 'server/providers/page-type-todo-example';

let API = new Router();

API.get('/', (req, res) => {
  pageTypeTodoExampleProvider(req).then(data => res.send(data.PageTypeTodoExample));
});

export default API;
