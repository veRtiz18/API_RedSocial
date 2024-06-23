const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// Configuración básica de CORS
app.use(cors());

// x
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API PARA NOTIFICACIONES');
});

routerApi(app);

// Middleware para manejo de errores
app.use(logErrors);
app.use(ormErrorHandler); // Descomentar si es necesario
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
