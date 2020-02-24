console.log('Client side javsacript file loaded!');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = `Nothing to display`
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = `The current temperature for your location is ${data.currentlyTemp} with a real feel temperature of ${data.currentlyFeelsLike}. Current weather data indicates ${data.summary}, and you can expect ${data.hourexpect.toLowerCase()} Expect ${data.dailyExpect.toLowerCase()}`
            }
        })
    })

})
