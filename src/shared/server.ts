/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import './infra/typeorm/index';
import 'dotenv/config';
import './container/index';


import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../swagger.json';
import routes from './infra/http/routes';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.listen(3333, () => {
  console.log('Runing on port: 3333');
});


