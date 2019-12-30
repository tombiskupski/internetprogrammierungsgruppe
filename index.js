const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
 
    res.render('pages/index', {
      
    });
  });

app.listen(port, function() {
    console.log(`Server listening on port ${port}…`)
   });
   
