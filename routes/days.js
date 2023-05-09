const express = require('express')
const router = express.Router() 

// Note that even though its '/' here, it still the '/days' route because of the "app.use('/days', dayRouter)"" in index.js
router.get('/new', (request, response) => {
    response.render('days/new')
})


router.post('/', (request, response) => {

    
})



// we have to tell our app to use this router!
module.exports = router

