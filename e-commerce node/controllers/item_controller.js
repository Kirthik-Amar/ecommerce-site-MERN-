const chalk = require('chalk')
const date = require('date-and-time')
const itemModel = require('../models/item_model')

module.exports = {
    getAllItems: async(req, res) => {
        try{
            let items = await itemModel.find().exec()
            console.log(chalk.green(items))
            res.status(200).send(items)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    deleteItemById: async(req, res) => {
        try{
            let result = await itemModel.deleteOne({_id:req.params.id}).exec()
            console.log(chalk.green(result))
            res.status(200).send(result)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    insertItem: async(req, res) => {
        try{
            let items = new itemModel(req.body)
            let result = items.save()
            console.log(chalk.green(result))
            res.status(200).send(result)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    updateItem: async(req, res) => {
        try{
            let item = await itemModel.findById(req.params.id).exec()
            item.set(req.body)
            let result = await item.save()
            console.log(result)
            res.status(200).send(item)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },
    
    getItemById: async(req, res) => {
        try{
            let item = await itemModel.findById(req.params.id).exec()
            console.log(item)
            res.status(200).send(item)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    searchItems: async(req, res) => {
        try{
            const nameRegex = new RegExp(req.body.itemName, 'i');
            let where = {itemName: nameRegex}
            let items = await itemModel.find(where).sort('itemName').exec()
            res.status(200).send(items)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },
}