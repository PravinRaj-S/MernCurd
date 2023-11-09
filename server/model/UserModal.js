const mongoose = require('mongoose')


const UserSchema = mongoose.Schema(
    {
        name:String,
        city:String,
        age:Number
    }
)

const userModal =  mongoose.model('user', UserSchema);

module.exports = userModal