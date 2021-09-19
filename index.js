const express = require('express')
const axios = require('axios')
const cors = require('cors')


const PORT = 3000
const HOST_JUDGE0 = 'http://host.docker.internal:2358'
const app = express()


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    app.use(cors())
    next()
})

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))


app.get('*', (req, res) => {
    axios.get(`${HOST_JUDGE0}${req.originalUrl}`).then(response => {
        res.send(response.data)
    })
})


app.post('*', (req, res) => {
    axios.post(`${HOST_JUDGE0}${req.originalUrl}`, req.body).then(response => {
        res.send(response.data)
    })
})


app.listen(PORT, () => {
    console.log(`Server start: ${PORT}`)
})
