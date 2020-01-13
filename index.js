const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

var activeUser = "not logged in";
var warningMessage = "";
var datenspeicher = null;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  console.log('GET1 /');
  
  db.all('SELECT * FROM comments', (err, rows) => {
    datenspeicher = rows;
  }); 

    db.all('SELECT * FROM pictures', (err, rows) => {
      console.log("read pictures")
      res.render('pages/', {
        photo: rows,
        data: datenspeicher,
        message: activeUser,
        warningMessage: "",
      })
    
  });

});

app.post('/bildupload', function (req, res) {
  console.log('POST /Bildupload');

  db.all('SELECT * FROM pictures', (err, rows) => {
    console.log("read pictures")
    var anzahlBilder = rows.length + 1 ;
    console.log(anzahlBilder);
});

  db.run('INSERT INTO pictures(base64) VALUES (?);',
    [req.body.base64url],
    (err) => {
      if (err) {
        console.log(err);
      } else {

        db.all('SELECT * FROM comments', (err, rows) => {
          datenspeicher = rows;
        }); 
      
          db.all('SELECT * FROM pictures', (err, rows) => {
            console.log("read pictures")
            res.render('pages/', {
              photo: rows,
              data: datenspeicher,
              message: activeUser,
              warningMessage: "",
            })
          
        });
      console.log("Saved in Data")
      }
    })
  
    /*
  db.all('SELECT * FROM comments', (err, rows) => {
    res.redirect('/');
  })
  */
});




app.get('/bildupload', function(req, res) {
  console.log("GET bildupload")
  res.render('pages/bildupload');
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
      datenspeicher = rows;
    }); 
  
      db.all('SELECT * FROM pictures', (err, rows) => {
        console.log("read pictures")
        res.render('pages/', {
          photo: rows,
          data: datenspeicher,
          message: activeUser,
          warningMessage: "",
        })
      
    });
  }
  else { 
    activeUser = "wrong passwort/username"
    console.log("Wrong password")
    db.all('SELECT * FROM comments', (err, rows) => {
      datenspeicher = rows;
    }); 
  
      db.all('SELECT * FROM pictures', (err, rows) => {
        console.log("read pictures")
        res.render('pages/', {
          photo: rows,
          data: datenspeicher,
          message: activeUser,
          warningMessage: "",
        })
      
    });
}
 })}
 else if ( !(req.body.kommentar == null)){
  console.log('POST COMMENT');

  if(activeUser == "wrong passwort/username" || activeUser == 'not logged in' || req.body.kommentar == ""){
  console.log("Can't Post")

  db.all('SELECT * FROM comments', (err, rows) => {
          datenspeicher = rows;
        }); 
      
          db.all('SELECT * FROM pictures', (err, rows) => {
            console.log("read pictures")
            res.render('pages/', {
              photo: rows,
              data: datenspeicher,
              message: activeUser,
              warningMessage: "",
            })
          
        });

  }else{
  db.run('INSERT INTO comments(user, kommentar, bildid) VALUES (?, ?, ?);',
    [activeUser, req.body.kommentar, req.body.bildnummer],
    (err) => {
      if (err) {
        console.log(err);
        
      } else {
        db.all('SELECT * FROM comments', (err, rows) => {
          datenspeicher = rows;
        }); 
      
          db.all('SELECT * FROM pictures', (err, rows) => {
            console.log("read pictures")
            res.render('pages/', {
              photo: rows,
              data: datenspeicher,
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
