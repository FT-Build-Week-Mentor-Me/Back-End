const express = require('express');
const knex = require('../data/db-config');

//routers
const userRouter = require('../routers/users-router')
const threadsRouter = require('../routers/threads-router')
const commentsRouter = require('../routers/comments-router')

const middleware = require('./configure-middleware')

const server = express();

middleware(server);

server.get('/', (req, res) => {
    res.status(200).json('server is live')
})


// Will have http://localhost:7000/login and /register
server.use('/api/', userRouter)
server.use('/api', threadsRouter)
server.use('/api', commentsRouter)

module.exports = server;