const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../models/comments-model')
const usersDB = require('../models/users-model')

router.get('/comments', (req, res) => {
    db.getComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(400).json(`could not retrieve comments: ${err}`)
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
    const comment = req.body
    usersDB.findById(comment.author_id)
        .then(user => {
            if (user) {
                db.postComment(comment)
                    .then(newComment => {
                        res.status(200).json(newComment)
                    })
                    .catch(err => {
                        res.status(400).json(`broken ${err}`)
                    })
            } else {
                res.status(404).json(`INVALID USER`)
            }
        })
        .catch(err => {
            res.status(400).json({ ERROR: `Unable to connect to server ${err}` })
        })
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