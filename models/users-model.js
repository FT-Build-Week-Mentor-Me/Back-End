const db = require('../data/db-config')

async function register(user) {
    const [id] = await db('users').insert(user, 'id')

    return findById(id)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}

function usernameLogin(user) {
    return db('users')
        .select('username', 'email', 'id', 'email', 'password')
        .where({ username: user })
}

function emailLogin(userEmail) {
    return db('users')
        .select('username', 'email', 'id', 'password')
        .where({ email: userEmail })
}



module.exports = {
    register,
    usernameLogin,
    emailLogin,
    findById,
}