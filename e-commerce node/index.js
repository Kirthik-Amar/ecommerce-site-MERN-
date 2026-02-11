const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const chalk = require('chalk')
const mongoose = require('mongoose')

const app = express()
app.use(cors())

mongoose.connect(`${config.mongodbServer}${config.databaseName}`, {})
.then(() => {
    console.log(chalk.green(`connected to: ${config.mongodbServer}${config.databaseName}`))
})
.catch((error) => {
    console.log(chalk.red(error))
})

const userRoutes = require('./routes/user_router')
app.use('/users', userRoutes)
const itemRoutes = require('./routes/item_router')
app.use('/items', itemRoutes)

app.listen(config.portNo, () => {
    console.log('----------')
    console.log(chalk.green(`http://${config.hostName}:${config.portNo}`))
})