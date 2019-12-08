const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 9999

app.use(cors())

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
    if (detail) {
        res.send(detail)
    } else {
        res.status(404).send()
    }
})

app.listen(port, () => console.log(`99 API listening on port ${port}!`))