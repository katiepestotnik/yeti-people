require('dotenv').config()
const { PORT, DATABASE_URL } = process.env
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(DATABASE_URL)
mongoose.connection
    .on('open', () => console.log('connected'))
    .on('close', () => console.log('disconnected'))
    .on('error', (err)=>console.log(err))


const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})
const People = mongoose.model('People', PeopleSchema)

//index
app.get('/people',async(req, res) => {
    try {
    //const people = await People.find({})
        res.status(200).json(await People.find({}))
    } catch(err) {
        res.status(400).json(err)
   }
})

//delete
app.delete('/people/:id', async(req, res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(req.params.id))
    } catch (err) {
        res.status(400).json(err)
    }
})
//update
app.put('/people/:id', async (req, res) => {
    try {
        res.status(200).json(await People.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch (err) {
        res.status(400).json(err)
    }
})
//create
app.post('/people', async (req, res) => {
    try {
        res.status(200).json(await People.create(req.body))  
    } catch (err) {
        res.status(400).json(err)
    }
})




app.listen(PORT, () => console.log(`Listening on ${PORT}`))