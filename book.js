const {Command} = require('commander')
const program = new Command()
const {prompt} = require('inquirer')
const { addBooks, findBook, updateBook, deleteBook, booksList } = require('.')

program
    .version('1.1.10')
    .description('Book Management System')

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter Book Title'
  },
  {
    type: 'input',
    name: 'author',
    message: "Enter Author's Name"
  },
  {
    type: 'input',
    name: 'publishedDate',
    message: 'Enter Published Date'
  },
  {
    type: 'input',
    name: 'genre',
    message: 'Enter Book Genre'
  },
  {
    type: 'input',
    name: 'rating',
    message: 'Enter Rating'
  }
]

program
    .command('add')
    .alias('a')
    .description('Add a New Book')
    .action(() => {
      prompt(questions).then(answers => addBooks(answers))
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find Book')
    .action((name) => findBook(name))

program
    .command('update <_id>')
    .alias('u')
    .description('Update Book')
    .action(_id => {
      prompt(questions).then(answers => updateBook(_id, answers))
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove Book')
    .action(_id => deleteBook(_id))

program
    .command('list')
    .alias('l')
    .description('Get All Books')
    .action(() => booksList())

program.parse(process.argv)