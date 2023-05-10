const express = require('express')
const Day = require('../models/day')
const router = express.Router() 

// Note that even though its '/' here, it still the '/days' route because of the "app.use('/days', dayRouter)"" in index.js
router.get('/new', (request, response) => {
    response.render('days/new', {day: new Day()})
})

router.get('/:slug', async (request, response) => {
    const day = await Day.findOne(
        { slug: request.params.slug }
        )
    if (day == null) response.redirect('/')
    response.render('days/show', { day: day })

})

router.post('/', async (request, response) => {
    let day = new Day({
        name: request.body.name,
        description: request.body.description,
        markdown: request.body.markdown
    })
    try {
       day = await day.save()
       response.redirect(`/days/${day.slug}`)

    } catch (e) {
        console.log(e)
        response.render('days/new', {day: day})

    }
    
})

router.delete('/:id', async (request, response) => {
    await Day.findByIdAndDelete(request.params.id)
    response.redirect('/')
})



// we have to tell our app to use this router!
module.exports = router

