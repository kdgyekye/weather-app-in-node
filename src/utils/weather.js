const request = require('request')

const weather = (coordinates,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9c21c3f48430fd61eb1aa93df34492cf&query=${coordinates}`;
    request({ url, json: true}, (error,response) => {
        const {responseError} = response.body
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(responseError){
            callback('Could not get weather information for your location',undefined)
        }
        else{
            const {observation_time,temperature,feelslike} = response.body.current
            callback(undefined, `At ${observation_time} It is currently ${temperature} degrees celsius outside but it feels like ${feelslike} degrees celsius`)
        }
    })
}

module.exports = weather