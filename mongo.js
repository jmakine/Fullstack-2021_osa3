const mongoose = require('mongoose')
  
  const password = process.argv[2]
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  
  const url =
    `mongodb+srv://fullstack:${password}@cluster0.7jqah.mongodb.net/osa3?retryWrites=true`
  mongoose.connect(url)
  
  const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Note = mongoose.model('Note', noteSchema)

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

else if (process.argv.length === 3) {
    console.log("Phonebook:")
    Note.find({}).then(result => {
        result.forEach(note => {
          console.log(`${note.name} : ${note.number}`)
        })
        mongoose.connection.close()
      })
}

else {
    const note = new Note({
    name: newName,
    number: newNumber,
  })
    
  note.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook!`)
    mongoose.connection.close()
  })
}