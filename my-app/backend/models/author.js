const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  /*
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  */
}, { toJSON : { virtuals: true } })

/*
resolve N + 1

schema.virtual('bookCount')
  .get(function(){
    return `${this.books.length}`
  })
    */

schema.virtual('bookCount',{
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  count: true
})

module.exports = mongoose.model('Author', schema)