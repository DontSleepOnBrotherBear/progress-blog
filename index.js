const dayRouter = require('./routes/days')
const module1 = require('./module1')

// console.log(module1)
// console.log('hello world')
// console.log(process)
// console.log('*************1*********************')
// console.log(process.platform)
// console.log('*************2*********************')
// console.log(process.env.USER)

// create an app using express
const express = require('express')
const app = express()

// setup the view engine 
app.set('view engine', 'ejs')

// make the app use the right router
app.use('/days', dayRouter)

// '/' is the url path,
app.get('/', (request, response) => { { 

    // // 4 options to send a response:
    //     // response.send(html)
    //    // response.send("express server running")
    //    // response.json({ message: 'hello world' })
    //    // response.status(500).send('sorry, out of order')
    // })

    // or just use the ejs view engine with render  
    const days = [{
        name: 'Monday',
        createdAt: new Date(),
        description: 'Test description'
    },
    { 
        name: 'Tuesday',
        createdAt:  new Date(),
        description: 'Test description'
    } ]

    response.render('index1', { days: days } )

}}
)

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))