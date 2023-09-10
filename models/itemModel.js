const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    'itemname':{
        type: String,
        required: [true, 'itemname is required']
    },
    'quantity':{
        type: Number,
        required: [true, 'quantity is required']
    },
    'price':{
        type: Number,
        required: [true, 'price is required']
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Items', itemSchema)