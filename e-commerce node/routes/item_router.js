const express = require('express')
const bodyParser = require('body-parser')
const date = require('date-and-time')

const itemController = require('../controllers/item_controller')

const itemRouter = express.Router()
itemRouter.use(bodyParser.urlencoded({extended:true}))
itemRouter.use(bodyParser.json())

itemRouter.get('/', itemController.getAllItems)
itemRouter.get('/:id', itemController.getItemById)

let prepareDateTime = function(req, res, next) {
    req.body.createdDateTime = date.format(new Date, 'DD/MM/YYYY HH:mm:ss')
    next()
}

itemRouter.post('/', prepareDateTime, itemController.insertItem)
itemRouter.post('/search', itemController.searchItems)
itemRouter.delete('/:id', itemController.deleteItemById)

let prepareDateTime2 = function(req, res, next) {
    req.body.updatedDateTime = date.format(new Date(), 'DD/MM/YYYY HH:mm:ss')
    next();
}

itemRouter.put('/:id', prepareDateTime2, itemController.updateItem)
module.exports = itemRouter