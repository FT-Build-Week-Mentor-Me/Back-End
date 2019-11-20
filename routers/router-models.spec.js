const request = require('supertest');
const server = require('../auth/server')

const db = require('../data/db-config')


const users = require('../models/users-model')
const threads = require('../models/threads-model')
const comments = require('../models/comments-model')

describe('Testing the users models', () => {
    describe('get a single user', () => {
        it('should return matching  user names', async () => {
            const result = await users.findById(2);
            expect(result.username).toBe('bigBuisnessBoi')
        })
    })
    //commenting out the below test: It works but you have to manually change the username and email for every test

    // describe('testing the register method', () => {
    //     it('should return status 200', async () => {
    //         const register = await users.register({
    //             username: "JestTestUser3",
    //             password: "TESTUSERJEST",
    //             email: "jestertester3@email.com",
    //             profile_type: "mentor"

    //         })
    //         expect(register.username).toBe("JestTestUser2")
    //     })
    // })
})

describe('testing the comments model', () => {
    describe('GET comments', () => {
        it('Should return a single comment', async () => {
            const result = await request(server)
                .get(`/api/comments/${3}`)
            expect(result.body).not.toHaveLength(0)
        })
        it("should return a list of all comments", async () => {
            const comments = await request(server)
                .get('/api/comments')
            expect(comments.body).not.toHaveLength(0)
            expect(comments.status).toBe(200)
        })
    })
})

describe('testing the threads endpoints/model', () => {
    describe('testing threads gets', () => {
        it('will return a list of threads', async () => {
            const allThreads = await threads.findAllThreads()
            expect(allThreads[2].id).toBe(3)
        })
        it('will create a thread', async () => {
            const newThread = {
                thread_title: "I want to test a thread",
                thread_body: "What is the best way to test if a thread is being created?",
                business_type: "Programatic Testing",
                author_id: 3
            }
            const postThread = await request(server)
                .post('/new-thread')
                .send(newThread)
            expect(postThread.body).toStrictEqual({})
        })
    })

})