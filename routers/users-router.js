const router = require('express').Router()
const bcrypt = require('bcryptjs')

const { check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')

const db = require('../models/users-model')

const loginVerification = require('../auth/verification-middleware')


// Users can login with either username or email, returns a token for FE Devs to put in header
router.post('/login', (req, res) => {
    const { username, password, email } = req.body;
    if (username) {
        db.usernameLogin(username)
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = getJwtToken(user)
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
                    console.log('This is before toekn gen', user.id)
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
router.post('/register', [
    check('password').isLength({ min: 5 })

],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

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


//Gets a single user by ID
router.get('/user/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .first()
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json(`user does not exist`)
            }
        })
        .catch(err => {
            res.status(400).json(`bad request to /user/id`)
        })
})

function getJwtToken(user) {
    const payload = {
        id: user.id
    }

    const secret = process.env.JWT_SECRET

    const options = {
        expiresIn: '2d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;