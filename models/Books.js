const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedDate: String,
  genre: {type: Array, default:[]},
  rating: String
})

module.exports = mongoose.model('books', BookSchema)