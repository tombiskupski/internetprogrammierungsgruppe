const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
    
  var pageTitle = "Versuch Nummero 1"
db.all('SELECT * FROM test', (err, rows) => {
  console.log("get / index funktion")
  res.render('pages/index', {
    title: pageTitle,
    data: rows
  });
});
});

app.listen(port, function() {
    console.log(`Server listening on port ${port}…`)
   });
   
