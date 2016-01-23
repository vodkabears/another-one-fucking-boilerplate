import { MongoClient } from 'mongodb';
import config from 'config';
import createTodos from './todos';

MongoClient.connect(config.mongodb)
  .then(db => {
    Promise.all([
      createTodos(db)
      /* Other functions here */
    ]).then(() => db.close()).catch(() => db.close());
  });
