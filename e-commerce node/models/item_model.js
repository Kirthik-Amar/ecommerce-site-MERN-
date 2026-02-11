const mongoose = require('mongoose')

const table_um2 = mongoose.model('itemtable', new mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId, required:true, auto:true},
    itemName: {type:String, required:true, unique:false, trim:true},
    itemId: {type:Number, required:true, unique:true, trim:true},
    password:{type:String, required:true, unique:false, trim:true},
}))

module.exports = table_um2