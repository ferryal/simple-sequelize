var express = require('express');
var router = express.Router();

//initiate depedencies sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('moviesdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const movies = sequelize.define('Movies', {
  title: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.NUMBER
  },
  release: {
    type: Sequelize.DATE
  }
});

//create Table
router.get('/movies', (req, res) => {
  movies.sync({force: true}).then(() => {
    res.send({message: "create table successfully"})
  })
})
// force: true will drop the table if it already exists
movies.sync({force: true}).then(() => {
  // Table created
  return movies.create({firstName: 'John', lastName: 'Hancock'});
});

movies.findAll().then(users => {
  console.log(users)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
