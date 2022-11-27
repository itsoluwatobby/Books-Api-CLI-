const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = mongoose.connect('mongodb+srv://itsoluwatobby:121112@cluster0.nxsjeey.mongodb.net/books-cli?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const Book = require('./models/Books')

exports.addBooks = (books) => {
  Book.create(books).then(() => {
    console.info('New Book Added')
    mongoose.connection.close()
  }).catch(error => console.info('Error Creating Adding Book'))
}

exports.findBook = (name) => {
  const search = new RegExp(name, 'i')
  Book.find({$or: [{title: search}, {author: search}]}).then(books => {
    console.info(books)
    const result = `${books?.length === 1 ? `${books.length} Book Found` : books?.length > 1 ? `${books.length} Books Found` : 'No Book Found'}`
    console.info(result)
    mongoose.connection.close()
  }).catch(error => console.info('Error Fetch Books'))
}

exports.updateBook = (_id, book) => {
  Book.updateOne({_id}, book).then(book => {
    console.info('Book Updated')
    mongoose.connection.close()
  })
}
