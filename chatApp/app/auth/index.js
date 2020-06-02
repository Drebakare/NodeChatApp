'use strict';
const passport = require('passport');
const config = require('../config');
const facebook_passport = require('passport-facebook').Strategy;
const h = require('../helpers');

module.exports = () => {
   passport.serializeUser((user, done)=> {
       done(null, user.id);
   })

   passport.deserializeUser((id, done)=>{
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => {console.log("error fetching the user")});
    })
    
    let auth_processor = (accessToken, refreshToken, profile, done) => {
        h.findOne(profile.id)
            .then( result => {
                if (result) {
                    done(null, result);
                }
                else{
                    h.createNewUser(profile)
                    .then( newChatUser => done (newChatUser))
                    .catch(error => {
                        console.log("Error creating the new user");
                    });
                }
            })
    }
    passport.use(new facebook_passport (config.fb, auth_processor));
}