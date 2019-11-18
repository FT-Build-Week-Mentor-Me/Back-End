const db = require('../data/db-config')
const userDB = require('../models/users-model')

function findThreads(id) {
    return db
        .select('T.thread_title', "T.thread_body")
        .from('users as U')
        .join('threads as T', function () {
            this.on("U.id", "=", "T.author_id")
        })
        .where({ 'T.author_id': id })
}

function findAllThreads() {
    return db('threads')
}

function addThread(thread, id) {
    const user = userDB.findById(id)
    return db
        .insert(thread)
}

module.exports = {
    findThreads,
    findAllThreads
}