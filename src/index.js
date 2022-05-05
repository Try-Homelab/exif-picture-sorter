/**
const express = require('express')
var path = require('path')
const app = express()
const port = 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './web/index.html'));
  });

app.get('/test', function (req, res) {
var level = parseInt(req.query.level) || 0;
console.log('server level:', level);
});
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) */

  