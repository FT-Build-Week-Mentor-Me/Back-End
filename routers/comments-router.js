const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../models/comments-model')
const usersDB = require('../models/users-model')
const threadDB = require('../models/threads-model')

router.get('/comments', (req, res) => {
    db.getComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(400).json(`could not retrieve comments: ${err}`)
        })
})

router.get('/thread/:id/comments', (req, res) => {
    const id = req.params.id
    db.findThreadComments(id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json(`invalid thread ID`)
            }
        })
        .catch(err => {
            res.status(400).json(`didn't work`)
        })
})

router.get('/comments/:id', (req, res) => {
    const id = req.params.id
    db.getCommentById(id)
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(400).json(`could not retrieve comment: ${err}`)
        })
})

router.post('/new-comment', (req, res) => {
    const comment = req.body.author_id && req.body.thread_id ? req.body : null
    const thread = threadDB.findThreadById(comment.thread_id).then(ress => ress) ? true : false
    console.log('returning from comment_text.length', comment.comment_text.length)
    if (comment.comment_text.length === 0) {
        res.status(401).json(`Comment cannot be empty`)
    } else {
        usersDB.findById(comment.author_id)
            .then(user => {
                if (user && thread) {
                    db.postComment(comment)
                        .then(newComment => {
                            res.status(200).json(newComment)
                        })
                        .catch(err => {
                            res.status(400).json(`${comment.thread_id} is not a valid thread id `)
                        })
                } else {
                    res.status(404).json(`${comment.author_id} is not a valid user id`)
                }
            })
            .catch(err => {
                res.status(400).json({ ERROR: `Unable to connect to server ${err}` })
            })
    }
})

router.put('/comments/:id', (req, res) => {
    const id = req.params.id
    const updated = req.body

    db.getCommentById(id)
        .then(comment => {
            if (comment) {
                db.updateComment(updated, id)
                    .then(updatedComment => {
                        res.status(200).json(updatedComment)
                    })
            } else {
                res.status(400).json(`could not find a comment with id: ${id}`)
            }
        })
        .catch(err => {
            res.status(400).json(`bad request ${err}`)
        })
})

router.delete('/comments/:id', (req, res) => {
    const id = req.params.id
    db.deleteComment(id)
        .then(deleted => {
            res.status(200).json({ DELETED: deleted })
        })
        .catch(err => {
            res.status(400).json(`could not find comment`)
        })
})

module.exports = router;