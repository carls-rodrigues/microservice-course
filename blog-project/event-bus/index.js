const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const events = []

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event)
  axios.post('http://172.25.242.243:4000/events', event);
  axios.post('http://172.25.242.243:4001/events', event);
  axios.post('http://172.25.242.243:4002/events', event);
  axios.post('http://172.25.242.243:4003/events', event);
  res.send({ status: 'Ok' })
})
app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => console.log('Listening on 4005'))