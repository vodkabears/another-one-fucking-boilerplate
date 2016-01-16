import { Router } from 'express';
import ComponentsAPI from './components';

let API = new Router();

API.use('/components', ComponentsAPI);

export default API;
