const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.render('pages/');
});

app.post('/', (req, res, next) => {
  let sql = 'SELECT * FROM user WHERE username = "${req.body.username}" AND password = "${req.body.password}"';
  var x;
  console.log('db test');
  db.all(sql, (err, rows) => {
    console.log('db');
   if (err) {
    console.log('error');
     next(err);
     return;
   }
   if (!rows) {
     console.log('wrong');
     res.status(400);
     res.send('Invalid username or password');
     return
   }
   rows.forEach((row) => {
     if (row.username === req.body.username && row.password === req.body.password) {
         x = 1;
         console.log('x1');
     }
     else {
         x = 2;
         console.log('x2');
     }
   })
   if (x === 1) {
    res.redirect('/index3');
  }
  else { res.redirect('/index2'); }
})
});
  

app.listen(port, function() {
    console.log(`Server listening on port ${port}…`)
   });
