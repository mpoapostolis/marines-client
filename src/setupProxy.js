const proxy = require('http-proxy-middleware');

// const target = 'http://localhost:3001';
const target = 'https://marines-serveless.vercel.app';

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    }),
  );
};
