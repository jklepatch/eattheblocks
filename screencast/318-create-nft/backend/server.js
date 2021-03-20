const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const router = require('./router.js');

const app = new Koa();

app
  .use(cors())
  .use(serve('./images'))
  .use(router.routes());

app.listen(process.env.PORT || 3000);
