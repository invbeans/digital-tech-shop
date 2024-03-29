const express = require('express')
const cors = require('cors')
require("dotenv").config()
const bodyParser = require('body-parser')
const knexConfig = require("./knexfile")
const { Model, ValidationError, ForeignViolationError } = require('objection')
//const {Role} = require('./models/Role') - ТАК НЕЛЬЗЯ все методы undefined
//все вопросы к их документации)))))))))
const Role = require('./models/Role') // А ТАК МОЖНО
const userRouter = require('./routes/user.routes')
const storefrontRouter = require('./routes/storefront.routes')
const orderRouter = require('./routes/order.routes')
const shippingRouter = require('./routes/shipping.routes')
const activityRouter = require('./routes/activity.routes')
const discountRouter = require('./routes/discount.routes')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 3000
const knex = require("knex")(knexConfig.development)
Model.knex(knex)

app.use(express.json())
let corsOptions = {
    origin: "http://localhost:4200",
    credentials: true
};
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/user", userRouter)
app.use("/storefront", storefrontRouter)
app.use("/order", orderRouter)
app.use("/shipping", shippingRouter)
app.use("/activity", activityRouter)
app.use("/discount", discountRouter)

//просто тестив
/* app.get('/role/:id', async (req, res) => {
    const { id } = req.params
    const role = await Role.query()
        .findById(id)
        .then(role => res.json(role))
        .catch(err => res.json(err)) // нужна асинхронка
})


app.post('/role', async (req, res) => {
    const newRole = { id: req.body.id, name: req.body.name }
    await Role.query().insert(newRole)
        .then(role => res.json(role))
        .catch(err => console.log(err))
    // knex('role').insert(req.body).then(() => res.json(req.body)) - или так, then обязательно всем
}) */

app.listen(PORT, () => {
    console.log(`Server listens on port = ${PORT}`)
})
