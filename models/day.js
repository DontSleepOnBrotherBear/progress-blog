const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    description: {
        type: String
    },  
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Day', daySchema)
