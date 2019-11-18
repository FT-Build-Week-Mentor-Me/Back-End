const db = require('../data/db-config')

function getComments() {
    return db('comments')
}

function getCommentById(id) {
    return db('comments')
        .where({ id })
}

function postComment(comment) {
    return db('comments')
        .insert(comment)
}

function updateComment(update, id) {
    return db('comments').where({ id }).update(update)
}

async function deleteComment(id) {
    const deleted = await getCommentById(id)
    return db('comments').where({ id }).del().then(() => deleted)
}

module.exports = {
    getComments,
    getCommentById,
    postComment,
    updateComment,
    deleteComment
}