const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
const PORT = 4000

const jwt = require('jsonwebtoken')
require('dotenv').config()

app.post('/login', jsonParser, (req, res) => {
    //Authenticate user

    const username = req.body.username
    const user = {name: username}

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

app.listen(PORT)