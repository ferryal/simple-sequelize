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
    type: Sequelize.INTEGER
  },
  release: {
    type: Sequelize.DATE
  }
});

//create Table
router.get('/movies', (req, res) => {
  movies.sync({force: true}).then(() => {
    res.send({message: "create table successfully"})
  }).catch(err => {
    res.send({message: "Failed create table"})
  })
})

//get all data
router.get('/view', (req, res) => {
  movies.findAll().then(Movies => {
    res.send(JSON.parse(JSON.stringify(Movies)))
  })
})

//post data to Table
router.post('/movies', (req, res) => {
  movies.create({title: req.body.title, genre: req.body.genre, rating: req.body.rating, release: req.body.release}).then(() => {
    res.send({message: "Data has been created"})
  }).catch(err => {
    res.send({message: "Failed create data"})
  })
})

//get one data by id
router.get('/view/:id', (req, res) => {
  movies.findById(req.params.id).then(Movies => {
    res.send(JSON.parse(JSON.stringify(Movies)))
  })
})

//delete  data by id
router.delete('/view/:id', (req, res) => {
  movies.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({message: "Data has been deleted"})
  }).catch(err => {
    res.send({message: "Failed delete data"})
  })
})

//update data by id
router.put('/view/:id', (req, res) => {
  movies.update({
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    release: req.body.release
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({message: "update successfully"})
  }).catch(err => {
    res.send({message: "failed update"})
  })
})
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {title: 'Express'});
// });

module.exports = router;
