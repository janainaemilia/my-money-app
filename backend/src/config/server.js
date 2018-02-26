const port = 3003

const bodyParser = require('body-parser')
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({ extended: true })) //Para toda requisição que chegar use o bodyParser para interpretar quando vier no formado urlenconded
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function(){
	console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server

//to start server production: npm run production
// to stop server production: pm2 stop all