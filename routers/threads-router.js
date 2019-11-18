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

module.exports = router;