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

// get all your routes from the routes folder
const dayRouter = require('./routes/days')

// setup the view engine 
app.set('view engine', 'ejs')

// this is to tell express how to access the user input from the new Day form (needs to come before the app.use(routers)
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

//force https
// NEED TO TURN OFF FOR DEV AND ON FOR PROD
app.use(requireHTTPS)
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }

// '/' is the url path,
app.get('/', async (request, response) => { { 

    // the find() function just gets all the days from the database
    const days = await Day.find().sort(
        { createdAt: 'desc' }
    )

    response.render('days/index1', { days: days } )

}})

// make the app use the right router
app.use('/days', dayRouter)

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))