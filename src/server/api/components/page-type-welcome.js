import { Router } from 'express';
import pageTypeWelcomeProvider from 'server/providers/page-type-welcome';

let API = new Router();

API.get('/', (req, res) => {
  pageTypeWelcomeProvider(req).then(data => res.send(data));
});

export default API;
