const router = require('express').Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const db = require('../models/users-model')

const loginVerification = require('../auth/login-middleware')


// Users can login with either username or email, returns a token for FE Devs to put in header
router.post('/login', loginVerification, (req, res) => {
    const { username, password, email } = req.body;
    if (username) {
        db.usernameLogin(username)
            .first()
            .then(user => {
                console.log(user.username)
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = getJwtToken(user.username)
                    console.log('This is before toekn gen', user.username)
                    res.status(200).json({
                        message: `Welcome ${user.username}`,
                        token
                    })
                } else {
                    res.status(400).json(`Unverified account`)
                }
            })
            .catch(err => {
                res.status(400).json({ Error: `bad request ${err}` })
            })
    } else {
        db.emailLogin(email)
            .first()
            .then(user => {

                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = getJwtToken(user.username)
                    res.status(200).json({
                        message: `Welcome ${user.username}`,
                        token
                    })
                } else {
                    res.status(400).json(`Unverified account`)
                }
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

function getJwtToken(username) {
    const payload = {
        username,
        profile_type: 'Mentor'
    }

    const secret = process.env.JWT_SECRET || "This is secret"

    const options = {
        expiresIn: '2d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;