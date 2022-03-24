const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
const PORT = 3000

const posts = [
    {
        username: 'Jim',
        title: 'post 2'
    },
    {
        username: 'Andrew',
        title: 'post 1'
    }
]

app.get('/posts', authToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(PORT)