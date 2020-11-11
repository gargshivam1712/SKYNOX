const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'))
}

const PORT = process.env.PORT || 8000

server.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`)
})