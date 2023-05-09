const express = require('express')
const router = express.Router() 

router.get('/', (request, response) => {
    response.send('hello from days.js')
})


// we have to tell our app to use this router!
module.exports = router