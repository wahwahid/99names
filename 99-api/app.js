const path = require('path')
const express = require('express')
const app = express()
const port = 9999

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/data/about.html'))
})

app.get('/list', (req, res) => {
    const data = require('./data/asmaul_husna_simple')
    res.send(data)
})

app.get('/detail/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = require('./data/asmaul_husna')
    const detail = data.find(v => v.id === id)
    res.send(detail)
})

app.listen(port, () => console.log(`99 API listening on port ${port}!`))