const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

var activeUser = "not logged in";
var warningMessage = "";


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
      warningMessage: "",
     
    });
    
  })
});

app.post('/bild-upload', function (req, res) {
  console.log('GET1000 /');
  
  db.all('SELECT * FROM comments', (err, rows) => {
    res.render('pages/', {
      data: rows,
      message: activeUser,
      warningMessage: "",
     
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
    res.send("wrong passwort/username");
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
    console.log("successfull login")

    db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
      
        message: activeUser,
        data: rows,
        warningMessage: "",
      })

      });
  }
  else { 
    activeUser = "wrong passwort/username"
    console.log("Wrong password")
    db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
        data: rows,
        message: activeUser,
        warningMessage: "",
      })
      
      });
}
 })}
 else if ( bildinput =! null ){
  console.log("please go!")
  db.all('SELECT * FROM comments', (err, rows) => {
    res.render('pages/', {
      data: rows,
      message: activeUser,
      warningMessage: "",
     
    });
    
  })
}
 else if ( !(req.body.kommentar == null)){
  console.log('POST COMMENT');

  if(activeUser == "wrong passwort/username" || activeUser == 'not logged in' || req.body.kommentar == ""){
  

  console.log("Can't Post")
  db.all('SELECT * FROM comments', (err, rows) => {
    res.render('pages/', {
      data: rows,
      message: activeUser,
      warningMessage: "Sie müssen sich einloggen um zu posten!",
    })
    });

  }else{
  db.run('INSERT INTO comments(user, kommentar) VALUES (?, ?);',
    [activeUser, req.body.kommentar],
    (err) => {
      if (err) {
        console.log(err);
        
      } else {
        db.all('SELECT * FROM comments', (err, rows) => {
      res.render('pages/', {
        data: rows,
        message: activeUser,
        warningMessage: "",
      })
      
      });
      console.log("Saved in Data")
      }
    })
  }

 }else{
   console.log("keine aktion ausgelöst")
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
