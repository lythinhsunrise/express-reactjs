const express = require('express')
const mysql = require('mysql')
const app = express()
const path = require("path");
app.use(express.static(path.join(__dirname,"reactapp","build")))

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_db'
});

connection.connect();

app.post('/api/login', function(req, res) {
  let sql = `SELECT * FROM users WHERE username="${req.body.username}" AND PASSWORD="${req.body.password}"`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({user: results})
    }
  });
});

//get list posts
app.get('/api/posts', function(req, res) {
  let sql = `SELECT * FROM posts ORDER BY id desc`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({posts: results})
    }
  });
});

//store post
app.post('/api/posts', function(req, res) {
  if(!req.body.description){
    req.body.description = '';
  }
  let sql = `INSERT INTO posts (title, description) VALUES ('${req.body.title}', '${req.body.description}');`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({status: true})
    }
  });
});

//detail post
app.get('/api/posts/:id', function(req, res) {
  let sql = `SELECT * FROM posts WHERE id=${req.params.id}`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({post: results})
    }
  });
});

//update post
app.post('/api/posts/:id', function(req, res) {
  if(!req.body.description){
    req.body.description = '';
  }
  let sql = `UPDATE posts SET title='${req.body.title}', description='${req.body.description}' WHERE id=${req.params.id};`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({status: true})
    }
  });
});

//delete post
app.post('/api/posts/delete/:id', function(req, res) {
  let sql = `DELETE FROM posts WHERE id=${req.params.id};`
  connection.query(sql, function (err, results) {
    if(err) throw err
    if(results){
      res.json({status: true})
    }
  });
});

app.listen(4000, () => console.log('App listening on port 4000'));