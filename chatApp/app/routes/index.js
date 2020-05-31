'use strict';
const h = require('../helpers');



module.exports = () =>  {
    let routes = {
        'get' : {
            '/' : (req, res, next)=>{
                res.render('login');
            },
            '/room' : (req, res, next) => {
                res.render('rooms');
            },
            '/chat' : (req,res,next) => {
                res.render('chat');
            }
        },
        'post' : { 

        }
    }
    return h.route(routes);
}