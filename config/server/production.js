export default {
  port: 3000,
  mongodb: 'mongodb://localhost:27017/boilerplate',
  redis: {
    host: 'localhost',
    port: 6379
  },
  session: {
    name: 'sid',
    proxy: true,
    resave: false,
    secret: 'Boilerplate',
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 365 },
    saveUninitialized: true
  }
};
