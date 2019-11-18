const express = require('express');
const knex = require('../data/db-config');

//routers
const userRouter = require('../routers/users-router')
const threadsRouter = require('../routers/threads-router')

const middleware = require('./configure-middleware')

const server = express();

middleware(server);

server.get('/', (req, res) => {
    res.status(200).json('server is live')
})

server.use('/', userRouter)
server.use('/', threadsRouter)

module.exports = server;