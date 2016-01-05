import { Router } from 'express';
import Todos from 'server/models/todos';

let API = new Router();

API.post('/', (req, res) => {
  res.send({ items: Todos.add(req, req.body) });
});

API.put('/', (req, res) => {
  res.send({ items: Todos.update(req, req.body, req.query.id) });
});

API.delete('/', (req, res) => {
  res.send({ items: Todos.remove(req, req.query.id) });
});

export default API;
