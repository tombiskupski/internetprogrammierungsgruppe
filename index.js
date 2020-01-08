const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.render('pages/index');
});

app.post('/Login', (req, res, next) => {
  let sql = `SELECT * FROM User WHERE username = "${req.body.username}" AND password = "${req.body.password}"`;
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
     if (row.username === req.body.username && row.password === req.body.password) {
         console.log('1');
     }
     else {
         console.log('2');
     }
   })
  })
})

app.listen(port, function() {
    console.log(`Server listening on port ${port}…`)
   });
