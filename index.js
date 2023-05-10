// create an app using express
const express = require('express')
const app = express()

const Day = require('./models/day')

const methodOverride = require('method-override')   

// set up database 
const mongoose = require('mongoose')
// username: benhebert
// cluster name: codingprogresscluster
// email for mongodb account: benhebert9917@gmail.com
// password: NANhR571za0hAL7o
mongoose.connect('mongodb+srv://benhebert:NANhR571za0hAL7o@codingprogresscluster.lbdg57m.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})


const dayRouter = require('./routes/days')

// Stuff that you can consol.log to see what is going on: 
// console.log('hello world')
// console.log(process)
// console.log('*************1*********************')
// console.log(process.platform)
// console.log('*************2*********************')
// console.log(process.env.USER)



// setup the view engine 
app.set('view engine', 'ejs')


// this is to tell express how to access the user input from the new Day form (needs to come before the app.use(routers)
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

// '/' is the url path,
app.get('/', async (request, response) => { { 

    // // 4 options to send a response:
    //     // response.send(html)
    //    // response.send("express server running")
    //    // response.json({ message: 'hello world' })
    //    // response.status(500).send('sorry, out of order')
    // })

    //    or just use the ejs view engine with render  

    // the find() function just gets all the days from the database
    const days = await Day.find().sort(
        { createdAt: 'desc' }
    )

    response.render('days/index1', { days: days } )

}}
)

// make the app use the right router
app.use('/days', dayRouter)

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))