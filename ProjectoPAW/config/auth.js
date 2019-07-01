module.exports={
    authenticationTrue: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('errorAlert','Por favor realize o login.');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/dashboard');      
    }
}