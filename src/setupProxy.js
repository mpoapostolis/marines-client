const proxy = require('http-proxy-middleware');

// const target = 'http://localhost:4000';
const target = 'https://marines-serveless.vercel.app';

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target,
      secure: false,
      logLevel: 'debug'
    }),
    proxy('/uploads', {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};
