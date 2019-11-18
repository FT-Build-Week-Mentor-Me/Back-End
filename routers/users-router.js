const router = require('express').Router()
const bcrypt = require('bcryptjs')

const db = require('../models/users-model')


// Users can login with either username or email
router.post('/login', (req, res) => {
    const { username, password, email } = req.body;

    if (username) {
        db.usernameLogin(username)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json({ Error: `bad request ${err}` })
            })
    } else {
        db.emailLogin(email)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json({ ERROR: `${err}: Bad REQUEST` })
            })
    }

})


// requires 4 fields, username, password, email, profile_type
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;

    db.register(user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({ Error: `Bad Request: ${err}` })
        })
})

module.exports = router;