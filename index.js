const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  console.log('GET1 /');
  
  db.all('SELECT * FROM comment', (err, rows) => {
	  
    res.render('pages/index', {
		
      data: rows
      
    });
  
  })
});



app.get('/login', function (req, res) {
  db.all('SELECT * FROM comment', (err, rows) => {
	  
    res.render('pages/login', {
		
      data: rows
      
    });
  
  })
});
app.get('/add-entry', function (req, res) {
  db.all('SELECT * FROM comment', (err, rows) => {
	  
    res.render('pages/add-entry', {
		
      data: rows
      
    });
  
  })
});


app.post('/login', function (req, res) {
  console.log('POST /add-entry');
  console.log(req.body);
  db.run('INSERT INTO comment(aktuellernutzer) VALUES (?);',
    [req.body.loginname],
    (err) => {
      if (err) {
        console.log(err);
        
      } else {
		  res.render('pages/login');
        
      }
    })
	
});


app.post('/index', function (req, res) {
	
 let sql = `SELECT * FROM user WHERE username1 = "${req.body.loginname}" AND password1 = "${req.body.password}"`;
 var x;

 db.all(sql, (err, rows) => {
  if (err) {
    next(err);
    return;
  }
  if (!rows) {
    res.status(400);
    res.send('Invalid username or password');
    return
  }
  rows.forEach((row) => {
    if (row.username1 === req.body.loginname && row.password1 === req.body.password) {
        x = 1;
    }
    else {
        x = 2;   
    }
  })
  if (x === 1) {

	  
    res.redirect('/login');
  }
  else { res.redirect('/index'); 

    res.render('pages/login');
    console.log('login');
  
}

 })
 });
  

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}…`)
});

module.exports = server;
