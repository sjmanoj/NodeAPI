const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Enter UserName']
    },
    email:{
        type: String,
        required: [true, 'Enter Email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Enter Password']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)