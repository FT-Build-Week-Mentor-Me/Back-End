const express = require('express');
const knex = require('../data/db-config');

const middleware = require('./configure-middleware')

const server = express();

middleware(server);

module.exports = server;