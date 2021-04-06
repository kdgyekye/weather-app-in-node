const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

//Paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up static directory to serve
app.use(express.static(publicDirPath));

//Set up handlebars views location and engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        author: 'Kingsley D. Gyekye'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        content: 'This is a dynamic page',
        author: 'Kingsley D. Gyekye'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        content: 'Contact us on 0243251803 for help',
        author: 'Kingsley D. Gyekye'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to input an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        }
    
        coordinates = latitude.toString()+','+longitude.toString()
        weather(coordinates, (error,weatherData) => {
            if(error) {
                return res.send({error})
            }
    
            res.send({
                Forecast: weatherData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        author: 'Kingsley David Gyekye',
        content: 'Help article not found. Please visit the links above.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        author: 'Kingsley David Gyekye',
        content: 'Page not found. Please visit the links above.'
    })
})

app.listen(3000, () => {
    console.log('The server is running on port 3000')
})