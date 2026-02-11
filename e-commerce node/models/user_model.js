const mongoose = require('mongoose')

const table_um = mongoose.model('usertable', new mongoose.Schema({ // Table name usertable
    _id: {type:mongoose.Schema.Types.ObjectId, required:true, auto:true},
    userName: {type:String, required:true, unique:false, trim:true},
    emailId: {type:String, required:true, unique:true, trim:true},
    password:{type:String, required:true, unique:false, trim:true},
    hashedPassword: {type:String, required:false, unique:false, trim:true}
}))

module.exports = table_um