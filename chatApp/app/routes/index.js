'use strict';
const h = require('../helpers');
const passport = require('passport');
const facebook_passport = require('passport-facebook');

module.exports = () =>  {
    let routes = {
        'get' : {
            '/' : (req, res, next)=>{
                res.render('login');
            },
            '/room' : (req, res, next) => {
                console.log(req.user);
                res.render('rooms', {
                    user : req.user
                });
            },
            '/chat' : (req,res,next) => {
                res.render('chat');
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/room',
                failureRedirect:  '/'
            })
        },
        'post' : { 

        }
    }
    return h.route(routes);
}