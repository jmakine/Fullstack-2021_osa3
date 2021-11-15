require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
const Note = require('./models/note')

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
      },
      {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
      }
  ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for '+ notes.length +' people </p>'
            + '<p>' +new Date()+ '</p>')
})  

app.get('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //const note = notes.find(note => note.id === id)
    Note.findById(request.params.id).then(note => {
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === "") {
        return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (notes.some(e => e.name === body.name)) {
        return response.status(400).json({ 
        error: 'name already exists' 
      })
    }

    if (body.number === "") {
        return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    if (notes.some(e => e.number === body.number)) {
        return response.status(400).json({ 
        error: 'number already exists' 
      })
    }
  
    const note = new Note({
        name: body.name,
        number: body.number
    })
  
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})