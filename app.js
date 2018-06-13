const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const {Client} = require('pg');

// Protect Yoself
const dotenv = require('dotenv');
require('dotenv').config();
dotenv.load();

// Server Port
const PORT = process.env.PORT || 3000;

// Create a New Express Application
const app = express();

// Connect to Database
const connectionString = 'postgresql://postgres:Runner4life!@localhost:5432/bigwig'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// View Engine Setup
app.use(express.static('Public'));
app.set('view engine', 'ejs');


// Routes 

// GET
app.get('/', (req, res) => {
  const client = new Client({
  	connectionString: connectionString,

  })

  client.connect()
  .then(() => {
  	return client.query (`SELECT * FROM blogposts`)
  
  })
  
    .then((result) => {
    return res.render('posts', {result})
  
  })

});

// GET ADD
app.get('/add', (req, res) => {
  const client = new Client({
    connectionString: connectionString,
  
  })

  client.connect()
  .then(() => {
    return res.render('add')
  })

});

// Post
app.post('/add', (req, res) => {
  const client = new Client({
    connectionString: connectionString,

  })

  client.connect()
  .then(() => {
    return client.query(`INSERT INTO blogposts (subject, memo) VALUES ($1, $2)`, [req.body.subject, req.body.memo]);
  
  })
  
    .then((result) => {
    return res.redirect('/')
 
  })

});

// Edit
app.get('/edit/blogposts/:id', (req, res) => {
  const client = new Client({
    connectionString: connectionString,

  })

  client.connect()
  .then(() => {
    return client.query(`SELECT * FROM blogposts WHERE id=$1`, [req.params.id]);
  
  })
  
    .then((result) => {
    return res.render('edit-blog', {result});
 
  })

});

// Update
app.post('/update', (req, res) => {
  const client = new Client({
    connectionString: connectionString,

  })

  client.connect()
  .then(() => {
    return client.query(`UPDATE blogposts SET subject=$1, =$2 WHERE id=$3`, [req.body.subject, req.body.memo, req.body.id]);
  
  })
  
    .then((result) => {
    return res.redirect('/');
 
  })

});

// Delete
app.post('/delete/blogposts/:id', (req, res) => {
  const client = new Client({
  	connectionString: connectionString,

  })

  client.connect()
  .then(() => {
  	return client.query (`DELETE FROM blogposts WHERE id=$1`, [req.params.id]);
  
  })
  
    .then((result) => {
    return res.redirect('/')
 
  })

});

// Loud and Clear
app.listen(PORT, ()=>{
	console.log('Listening on port:', PORT)
});

// TAK
