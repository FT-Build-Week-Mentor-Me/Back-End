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

function addThread(thread) {
    return db('threads')
        .insert(thread)
}

function findThreadById(threadId) {
    return db('threads')
        .where({ id: threadId })
}

async function deleteThread(id) {
    const deleted = await findThreadById(id)
    return db('threads').where({ id }).del().then(() => deleted)
}

function editThread(thread, id) {
    return db('threads').where({ id }).update(thread)
}

module.exports = {
    findThreads,
    findAllThreads,
    addThread,
    deleteThread,
    findThreadById,
    editThread
}