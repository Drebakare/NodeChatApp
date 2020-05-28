'use strict';
const config = require('../db');
const mongoose = require('mongoose').connect(config.dbURI);

mongoose.connection.on('error', error => {
    console.log("Mongo Error: ", error);

});

module.exports = {
    Mongoose : mongoose
}