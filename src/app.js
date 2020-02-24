const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const utils = require('./utils/geoUtils')

const app = express()
const port = 3000
const directoryPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(directoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'GoloisaNinja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'GoloisaNinja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'GoloisaNinja'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    utils.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        
        if (error) {
            return res.send({
                error: error
            })
        }

        utils.getCast(latitude, longitude, (error, { 
            currentlyTemp, 
            currentlyFeelsLike, 
            currentlyPrecip,
            currentlySum,
            hourUpcomingSum,
            dailyExpect
         } = {}) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                address: req.query.address,
                location,
                currentlyTemp,
                currentlyFeelsLike,
                precip: currentlyPrecip,
                summary: currentlySum,
                hourexpect: hourUpcomingSum,
                dailyExpect
        
            })
        })

        

    })

    

    
})

app.get('/help/*', (req, res) => {
    res.render('my404', {
        title: '404 page',
        name: 'That Help topic could not be found'
    })
})

app.get('*', (req, res) => {
    res.render('my404', {
        title: '404 page',
        name: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
    
})