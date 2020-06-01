'use strict'
const express = require('express');
const app = express();
const chatApp = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatApp.router);
app.listen(app.get('port'), ()=>{
    console.log('App working on port: ' + app.get('port'));
});

