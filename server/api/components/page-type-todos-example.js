import { Router } from 'express';
import pageTypeTodosExampleProvider from 'server/providers/page-type-todos-example';

let API = new Router();

API.get('/', (req, res) => {
  pageTypeTodosExampleProvider(req).then(data => res.send(data.PageTypeTodosExample));
});

export default API;
