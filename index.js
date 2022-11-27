const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})

const Book = require('./models/Books')

exports.addBooks = (books) => {
  Book.create(books).then(() => {
    console.info('New Book Added')
    mongoose.connection.close()
  }).catch(error => {
    console.info('Error Creating Adding Book')
    mongoose.connection.close()
  })
}

exports.findBook = (name) => {
  const search = new RegExp(name, 'i')
  Book.find({$or: [{title: search}, {author: search}]}).then(books => {
    console.info(books)
    const result = `${books?.length === 1 ? `${books.length} Book Found` : books?.length > 1 ? `${books.length} Books Found` : 'No Book Found'}`
    console.info(result)
    mongoose.connection.close()
  }).catch(error => {
    console.info('Error Fetch Books')
    mongoose.connection.close()
  })
}

exports.updateBook = (_id, book) => {
  const getBook = Book.findById(_id)
  getBook.updateOne({$set: book}).then(() => {
    console.info('Book Updated')
    mongoose.connection.close()
  }).catch(error => {
    console.info('Error Updating Book')
    mongoose.connection.close()
  })
}

exports.deleteBook = (_id) => {
  Book.deleteOne({_id}).then(() => {
    console.info('Book Record Deleted Successfully')
    mongoose.connection.close()
  }).catch(error => {
    console.info('Error Deleting Book')
    mongoose.connection.close()
  })
}

exports.booksList = () => {
  Book.find().then(books => {
    console.info(books)
    const result = `${books?.length === 1 ? `${books.length} Book Found` : books?.length > 1 ? `${books.length} Books Found` : 'No Book Found'}`
    console.info(result)
    mongoose.connection.close()
  }).catch(error => {
    console.info('Error Fetching Books')
    mongoose.connection.close()
  })
}
