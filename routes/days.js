const express = require('express')
const Day = require('../models/day')
const router = express.Router() 

// Note that even though its '/' here, it still the '/days' route because of the "app.use('/days', dayRouter)"" in index.js
router.get('/new', (request, response) => {
    response.render('days/new', {day: new Day()})
})

router.get('/edit/:id', async (request, response) => {
    const day = await Day.findById(request.params.id)
    response.render('days/edit', {day: day})
})

router.get('/:slug', async (request, response) => {
    const day = await Day.findOne(
        { slug: request.params.slug }
        )
    if (day == null) response.redirect('/')
    response.render('days/show', { day: day })

})

router.post('/', async (request, response, next) => {

    request.day = new Day()
    next()
    
}, saveDayAndRedirect('new'))

router.put('/:id', async (request, response, next) => {

    request.day =  await Day.findById(request.params.id)
    next()
    
}, saveDayAndRedirect('edit'))

router.delete('/:id', async (request, response) => {
    await Day.findByIdAndDelete(request.params.id)
    response.redirect('/')
})



function saveDayAndRedirect(path){
    return async (request, response) => {
        let day = request.day
        day.name = request.body.name
        day.description = request.body.description
        day.markdown = request.body.markdown

        try {
           day = await day.save()
           response.redirect(`/days/${day.slug}`)
    
        } catch (e) {
            console.log(e)
            response.render(`days/${path}`, {day: day})
    
        }
    
    }
}

// we have to tell our app to use this router!
module.exports = router

