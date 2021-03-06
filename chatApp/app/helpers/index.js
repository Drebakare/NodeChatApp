'use strict';
const router = require("express").Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
    for (let key in routes) {
       if ( (typeof(routes[key]) === 'object' )  && (routes[key] !== null ) && (! (routes[key] instanceof Array))) {
           _registerRoutes(routes[key] , key);
       }
       else{
           if (method === 'get') {
               router.get(key, routes[key]);
           }
           else if (method === 'post'){
               router.post(key, routes[key]);
           }
           else{
               router.use(routes[key]);
           }
       }
        
    }
}

let findOne = profileID =>{
    return db.userModel.findOne({
        'profileId' : profileID
    })
}

let createNewUser = profile =>{
    return new Promise ((resolve, reject) =>{
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName : profile.displayName,
            profilePic : profile.photos[0].value || "",
        });

        newChatUser.save(error => {
            if (error) {
                console.log(error);
                reject(error);
            }
            else{
                resolve(newChatUser); 
            }
        })
    })
}

let findById = id => {
    return new Promise((resolve, reject) => {
        db.userModel.findById(id, (error, user) => {
            if (error) {
                reject(error);
            }
            else{
                resolve(user)
            }
        });
    })
}
let route = routes => {
    _registerRoutes (routes);
    return router;
}
let isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) { // the method isAuthenticated is provided by passport
        next();
    }
    else{
        res.redirect('/');
    }
}

module.exports = {
    route : route,
    findOne: findOne,
    createNewUser : createNewUser,
    findById: findById,
    isAuthenticated : isAuthenticated

}