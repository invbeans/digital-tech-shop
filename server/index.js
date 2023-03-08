const express = require('express')
const cors = require('cors')
const knexConfig = require("./knexfile")

const app = express()
const PORT = 3000;
const knex = require("knex")(knexConfig.development)

app.use(express.json())
app.use(cors)

app.listen(PORT, () => {
    console.log(`Server listens on port = ${PORT}`)
})