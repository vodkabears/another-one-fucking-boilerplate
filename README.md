Another one fucking boilerplate
===============================

[![Build status](https://img.shields.io/travis/VodkaBears/another-one-fucking-boilerplate.svg?style=flat-square)](https://travis-ci.org/VodkaBears/another-one-fucking-boilerplate)
[![Coverage status](https://img.shields.io/coveralls/VodkaBears/another-one-fucking-boilerplate.svg?style=flat-square)](https://coveralls.io/github/VodkaBears/another-one-fucking-boilerplate)
[![Dependencies status](https://img.shields.io/david/VodkaBears/another-one-fucking-boilerplate.svg?style=flat-square)](https://david-dm.org/VodkaBears/another-one-fucking-boilerplate)
[![Dev dependencies status](https://img.shields.io/david/dev/VodkaBears/another-one-fucking-boilerplate.svg?style=flat-square)](https://david-dm.org/VodkaBears/another-one-fucking-boilerplate)

Hell yeah. 18+

### Global requirements

* Linux, Mac
* Node.js 4+
* npm
* MongoDB 3.2+
* Redis 3+
* g++ 4.8+ (for hiredis, for deploying)
* pm2 (for production)
* server for static content (for production, Nginx is recommended)

Some of these requirements may be excessive for you.

### Getting Started

dev configuration: `npm run dev`  
prod configuration: `npm run prod`  
deploy: `npm run deploy`


Dev, prod settings in `config/`  
Deployment settings in `shipitfile.js`  

### Features

* Isomorphic rendering for node.js and browser with [React](https://github.com/facebook/react)
* Isomorphic routing for node.js and browser with [React Router](https://github.com/reactjs/react-router)
* [Babel](https://babeljs.io/) for new JS features: [es2015](https://babeljs.io/docs/plugins/preset-es2015/), [stage-2](http://babeljs.io/docs/plugins/preset-stage-2/), [JSX](https://babeljs.io/docs/plugins/preset-react/) for React
* Same JS for node.js and browser.
* [Webpack](https://webpack.github.io/) for bundling
* [PostCSS](https://github.com/postcss/postcss) and plugins:
  * [Autoprefixer](https://github.com/postcss/autoprefixer)
  * [CSSNext](https://github.com/MoOx/postcss-cssnext)
* [CSS modules](https://github.com/css-modules/css-modules)
* [Optimizations of the client bundle](https://github.com/webpack/docs/wiki/optimization)
* Automatic [image optimization](https://github.com/tcoopman/image-webpack-loader) and inlining when it is possible
* Polyfills
 * [Babel polyfill](https://babeljs.io/docs/usage/polyfill/)
 * [Fetch](https://github.com/github/fetch)
* Cache busting
* Auto rebuild
* [Express server](https://github.com/expressjs/express/)
* [Redis](https://github.com/antirez/redis)
* [MongoDB](https://www.mongodb.org/)
* [Data validation for MongoDB](https://docs.mongodb.org/manual/core/document-validation/)
* Providing data for components in one response
* API for components
* [Flux](https://facebook.github.io/flux/)-like architecture
* [ESLint](https://github.com/eslint/eslint)
* [CSSComb](http://csscomb.com/)
* BDD tests with [Mocha](https://github.com/mochajs/mocha), [Chai](http://chaijs.com/api/bdd/), [Sinon](https://github.com/sinonjs/sinon), [Nock](https://github.com/pgte/nock)
* [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage
* Production configuration is included
* Deploying with [Shipit](https://github.com/shipitjs/shipit) in one command
* One command rollbacks
* [Travis CI](https://travis-ci.org/)
* [Coveralls](https://coveralls.io/)
* HTML best practice from [HTML5 boilerplate](https://github.com/h5bp/html5-boilerplate)
* TodoMVC
* Up-to-date dependencies

### Architecture

![Architecture](https://raw.githubusercontent.com/VodkaBears/vodkabears.github.com/master/aofb.png)

### Roadmap

* Replace JSX transcompilation
* Service workers
* Streaming server-side rendering
* Per-page resource loading
* i18n
* Integrate useful hipster technologies to be hot and fashionable

### Note

This is my **own** boilerplate for my **personal** usage.

### Contributing

[Please, read](https://github.com/VodkaBears/another-one-fucking-boilerplate/blob/master/CONTRIBUTING.md).

### License

MIT
