const db = require('../data/db-config')
const userDB = require('../models/users-model')

function findThreads(author_id) {
    return db('threads as T')
        .join('users as U', 'T.author_id', `U.id`)
        .select('T.thread_title', "T.thread_body", "U.username", "T.author_id")
        .where({ author_id })
}
function findAllThreads() {
    return db('threads')
}

function addThread(thread) {
    return db('threads')
        .insert(thread, 'id')
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