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
        .insert(comment, 'id')
}

function updateComment(update, id) {
    return db('comments').where({ id }).update(update)
}

async function deleteComment(id) {
    const deleted = await getCommentById(id)
    return db('comments').where({ id }).del().then(() => deleted)
}

function findUserComments(author_id) {
    return db('comments as C')
        .join('users as U', 'C.author_id ', 'U.id')
        .select('U.profile_type')
        .where({ author_id })
}

module.exports = {
    getComments,
    getCommentById,
    postComment,
    updateComment,
    deleteComment,
    findUserComments
}