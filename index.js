const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const port = process.env.PORT || 3000;
const app = express();
const db = new sqlite3.Database('./datenbank/data.db');

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.listen(port, function() {
    console.log(`Server listening on port ${port}…`)
   });
   
