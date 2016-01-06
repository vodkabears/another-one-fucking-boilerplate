import { Router } from 'express';
import Todos from 'server/models/todos';

let API = new Router();

API.post('/', (req, res) => {
  Todos.add(req, req.body)
    .then(items => res.send({ items }));
});

API.put('/edit', (req, res) => {
  Todos.edit(req, req.body.text, req.query.id)
    .then(items => res.send({ items }));
});

API.put('/toggle', (req, res) => {
  Todos.toggle(req, req.body.isCompleted, req.query.id)
    .then(items => res.send({ items }));
});

API.delete('/', (req, res) => {
  Todos.remove(req, req.query.id)
    .then(items => res.send({ items }));
});

export default API;
