const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API PARA NOTIFICACIONES');
})

routerApi(app);
app.use(logErrors);
//app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})


