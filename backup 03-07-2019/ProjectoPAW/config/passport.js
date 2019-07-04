const LocalStrgy = require('passport-local').Strategy;
//const CookieStrategy = require('passport-cookie').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//carregar o schema do User
const User = require('../models/user');





module.exports = function(passport){
    passport.use(
        new LocalStrgy({usernameField:'username'}, (username,password,done) => {
            //verificar se existe um utilizador igual
            User.findOne({username:username})
                .then(user => {
                    if(!user){
                        //se o utilizador nao existir
                        return done(null, false, {message:'Este utilizador não está registado!'});
                    }
                    // verificar password
                    bcrypt.compare(password, user.password, (err, isMatch) =>{
                        if(err) throw err;
                        if(isMatch){
                            //se estiver correta
                            return done(null,user);
                        }else{
                            //se tiver
                            return done(null,false),{message:'Password incorreta!'};
                        }
                    });
                })
            .catch(err => console.log(err));
        })
    );

    /*
    passport.use(new CookieStrategy(
        function(token, done) {
          User.findByToken({ token: token }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
        */
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
};