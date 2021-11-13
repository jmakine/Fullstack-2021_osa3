const express = require('express')
const app = express()

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
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})