const request = require('request')

const checkMinutely = (param) => param === undefined ? 'the unexpected (no specific hourly expectation given)' : param.summary

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29sb2lzYW5pbmphIiwiYSI6ImNrNjgxOW01NTAwOGkzbnFlZm5iejNjZ2sifQ.PvJusMC8NhFSUgsXPJja9Q'

    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to map services!', undefined)
        } else if (body.features.length === 0) {
            callback('Bad location query, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const getCast = (latitude, longitude, callback) => {

    const url  = 'https://api.darksky.net/forecast/767a77a83c0bc9e847512ff90c998680/' + latitude + ',' + longitude 
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('No connection to weather services!', undefined)
        } else if (body.code === 400) {
            callback('Location data not valid, try new search query', undefined)
        } else {
            callback(undefined, {
                currentlyTemp: body.currently.temperature,
                currentlyFeelsLike: body.currently.apparentTemperature,
                currentlyPrecip: body.currently.precipProbability,
                currentlySum: body.currently.summary.toLowerCase(),
                dailyExpect: body.hourly.summary,
                hourUpcomingSum: checkMinutely(body.minutely)
                
            })
        }
    })
}


module.exports = {
    geocode : geocode,
    getCast : getCast
}