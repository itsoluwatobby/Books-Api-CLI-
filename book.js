const {Command} = require('commander')
const program = new Command()
const {prompt} = require('inquirer')
const { addBooks, findBook } = require('.')

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

program.parse(process.argv)