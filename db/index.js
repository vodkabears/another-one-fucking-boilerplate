import { MongoClient } from 'mongodb';
import createTodos from './todos';

MongoClient.connect('mongodb://localhost:27017/boilerplate')
  .then(db => {
    Promise.all([
      createTodos(db)
      /* Other functions here */
    ]).then(() => db.close()).catch(() => db.close());
  });
