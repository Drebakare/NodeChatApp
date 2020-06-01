'use strict';
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(
  config.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", (error) => {
  console.log("Mongo Error: ", error);
});

mongoose.connection.on('connected', ()=>{
    console.log("App Connected");
});

const chatUser = new mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String,
});

let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose : mongoose,
    userModel
}