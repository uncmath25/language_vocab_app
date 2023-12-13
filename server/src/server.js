'use strict';

const cors = require('cors');
const express = require('express');

const useRouter = require(`./api/${process.env.API_VERSION}/baseRouter.js`);
const buildMysqlClient = require('./client/mysqlClient');
const buildLogger = require('./middleware/logger');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const logger = buildLogger(app);

// injectables
const mysqlClient = buildMysqlClient(logger);

// routing
useRouter(`/api/${process.env.API_VERSION}`, app, logger, mysqlClient);

app.listen(process.env.SERVER_PORT, () => logger.info(`Node Express server is running env: ${process.env.NODE_ENV} on port: ${process.env.SERVER_PORT}`));
