const express = require('express')
const bodyParser = require('body-parser')
const date = require('date-and-time')

let userController = require('../controllers/user_controller')

const userRouter = express.Router()
userRouter.use(bodyParser.urlencoded({extended:true}))
userRouter.use(bodyParser.json())

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUserById)

let prepareDateTime = function(req, res, next) {
    req.body.createdDateTime = date.format(new Date, 'DD/MM/YYYY HH:mm:ss')
    next()
}

userRouter.post('/', prepareDateTime, userController.insertUser)
userRouter.post('/login', userController.isValidUser)
userRouter.delete('/:id', userController.deleteUserById)

let prepareDateTime2 = function(req, res, next) {
    req.body.updatedDateTime = date.format(new Date(), 'DD/MM/YYYY HH:mm:ss')
    next();
}

userRouter.put('/:id', prepareDateTime2, userController.updateUser)
module.exports = userRouter