const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

daySchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }

    if (this.markdown) {
        // this is to prevent malicious code from being entered into the database
       this.sanitizedHtml = dompurify.sanitize(marked.parse((this.markdown)))
        
    }

    next()

})

module.exports = mongoose.model('Day', daySchema)
