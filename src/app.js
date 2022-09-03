'use strict'
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const alumnosRoutes = require('./routes/alumnos.routes')
const maestrosRoutes = require('./routes/maestros.routes');
const swaggerOptions = require('./utils/swagger');
const { port } = require('./config');
const { connection } = require('./database');

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

const app = express();

app.set("port", port);

app.use(express.json());
app.use(cors());

connection()

app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/alumnos', alumnosRoutes);
app.use('/maestros', maestrosRoutes);

//Exportamos
module.exports = app;