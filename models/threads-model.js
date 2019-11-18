const db = require('../data/db-config')

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

module.exports = {
    findThreads,
    findAllThreads
}