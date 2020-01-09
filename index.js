const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

var activeUser = "you are not signed in";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  console.log('GET1 /');
  
  db.all('SELECT * FROM comments', (err, rows) => {
    res.render('pages/', {
      data: rows,
      message: activeUser,
      //data: rows,
     
    });
    
  })
});

app.post('/', function (req, res) {
  if (!(req.body.loginname == null)){
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
        activeUser = row.username1;
    }
    else {
        x = 2;
        
    }
  })
  if (x === 1) {
    console.log("POST LOGIN")

    db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
      
        message: activeUser,
        data: rows,
      })

      });
  }
  else { 
    db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
        data: rows,
        message: "wrong passwort/username",
        //data: rows,
      })
      
      });
}
 })}
 else {

  console.log('POST COMMENT');

  db.run('INSERT INTO comments(user, kommentar) VALUES (?, ?);',
    [activeUser, req.body.kommentar],
    (err) => {
      if (err) {
        console.log(err);
        
      } else {
        db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
        data: rows,
        message: "wrong passwort/username",
        //data: rows,
      })
      
      });
      console.log("Saved in Data")
        
      }
    })

 }

 });

/*
 app.post('/', function (req, res) {
  console.log('POST COMMENT');

  db.run('INSERT INTO comments(user, kommentar) VALUES (?, ?);',
    [activeUser, req.body.comment],
    (err) => {
      if (err) {
        console.log(err);
        
      } else {
      res.render('pages/');
      console.log("Saved in Data")
        
      }
    })
	
});*/
  

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}…`)
});

module.exports = server;
