const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

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
    },
    slug: {
        type: String,
        required: true,
        unique: true   
    }
})

daySchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }

    next()

})
module.exports = mongoose.model('Day', daySchema)
