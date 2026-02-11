const chalk = require('chalk')
const date = require('date-and-time')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const userModel = require('../models/user_model')

function createJwtToken(emailId) {
    let expiryTime = Math.floor(Date.now()/1000 + config.JWTValidMinutes*60)
    let jwtToken = JWT.sign({emailId:emailId, exp:expiryTime}, config.secretWord)
    return jwtToken
}

module.exports = {
    getAllUsers: async(req, res) => {
        try{
            let users = await userModel.find().exec()
            console.log(chalk.green(users))
            res.status(200).send(users)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    deleteUserById: async(req, res) => {
        try{
            let result = await userModel.deleteOne({_id:req.params.id}).exec()
            console.log(chalk.green(result))
            res.status(200).send(result)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    insertUser: async(req, res) => {
        try{
            const {password, ...otherFields} = req.body;
            const hashedPassword = await bcrypt.hash(password, config.saltRounds)
            const newUser = new userModel({
                ...otherFields,
                password:password,
                hashedPassword:hashedPassword
            });
            const result = await newUser.save()
            const {password:_, ...userData} = result.toObject
            res.status(201).send(userData);
        } catch(error) {
            if(error.code == 11000) {
                console.log(chalk.red('error, emailId is is use'))
                res.status(500).send('error, emailId is in use')
            } else{
                console.log(chalk.red(error))
                res.status(500).send(error)
            }
        }
    },

    updateUser: async(req, res) => {
        try{
            let User = await userModel.findById(req.params.id).exec()
            User.set(req.body)
            let result = await User.save()
            console.log(result)
            res.status(200).send(User)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },
    
    getUserById: async(req, res) => {
        try{
            let user = await userModel.findById(req.params.id).exec()
            console.log(user)
            // console.log(req.params.id)
            res.status(200).send(user)
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },

    isValidUser: async (req, res) => {
        try{
            const {emailId, password} = req.body;
            let jwtToken = ''
            let result = {}
            let where = {emailId:req.body.emailId}
            let user = await userModel.find(where).exec()
            if(!user){
                console.log(chalk.red('login failed for emailId'))
                return res.status(404).send({error:'user not found'})
            }
            console.log('hashedPassword:' + user[0].hashedPassword)
            const isMatch = await bcrypt.compare(password, user[0].hashedPassword);
            if(!isMatch) {
                console.log(chalk.red('login failed for pw'))
                return res.status(401).send({error:'login failed invalid emailId and password'});
            } else {
                jwtToken = createJwtToken(req.body.emailId)
                console.log(chalk.green('login success'))
                result = {userName:user[0].userName, emailId:user[0].emailId, jwtToken:jwtToken}
                res.status(201).send(result)
            }
        } catch(error) {
            console.log(chalk.red(error))
            res.status(500).send(error)
        }
    },
}