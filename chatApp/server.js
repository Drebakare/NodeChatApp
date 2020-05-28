'use strict'
const express = require('express');
const app = express();
const chatApp = require('./app');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/', chatApp.router);

app.listen(app.get('port'), ()=>{
    console.log('App working on port: ' + app.get('port'));
});

