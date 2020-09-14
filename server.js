const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { response } = require('express');
const app = express()
const url = 'mongodb://localhost:27017/blogDb';


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("hi");
});
app.get('/api', (req, res) => {
    res.send('hi therer')
});
 
app.listen(3000, () => console.log('Login server running on port 3000!'))