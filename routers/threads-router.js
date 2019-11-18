const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../models/threads-model')


// Gets a users threads from their ID
router.get('/user/:id/threads', (req, res) => {
    const id = req.params.id;

    db.findThreads(id)
        .then(thread => {
            if (thread.length > 0) {
                res.status(200).json(thread)
            } else {
                res.status(200).json([{ thread_title: `This user hasn't posted a question` }])
            }
        })
        .catch(err => {
            res.status(400).json({ ERROR: `BAD REQUEST HOMIE: ${err}` })
        })
})

// Displays all avalible threads
router.get('/threads', (req, res) => {
    db.findAllThreads()
        .then(threads => {
            res.status(200).json(threads)
        })
        .catch(err => {
            res.status(400).json(`Bad request: ${err}`)
        })
})

router.post('/new-thread', (req, res) => {
    const thread = req.body
    db.addThread(thread)
        .then(thread => {
            res.status(200).json(thread)
        })
})

router.delete('/:id/thread', (req, res) => {
    const id = req.params.id
    db.deleteThread(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted })
            } else {
                res.status(404).json(`could not find thread with that id`)
            }
        })
        .catch(err => {
            res.status(400).json(`Bad request: ${err}`)
        })
})

router.put('/:id/thread', (req, res) => {
    const id = req.params.id
    const updated = req.body

    db.findThreadById(id)
        .then(thread => {
            if (thread) {
                db.editThread(updated, id)
                    .then(updatedThread => {
                        res.status(200).json(updatedThread)
                    })
            } else {
                res.status(404).json(`Could not find thread with given id`)
            }
        })
        .catch(error => {
            res.status(500).json(`Bad request ${err}`)
        })
})

module.exports = router;