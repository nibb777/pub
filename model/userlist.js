const mongoose = require('mongoose')

const userlist = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide a name']
    },
    age:{ 
        type: Number,
        required: [true, 'Age is required']
    },
    favouriteFoods:{
        type: [String],
        required: [true, 'Tell us which is your favourite food :)']
    }
})

module.exports = mongoose.model('user', userlist)