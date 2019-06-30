const mongoose = require('mongoose');
let Schema = mongoose.Schema;




//schema user
const user = new Schema({
    nome: {type: String, required:true},
    password: {type:String, required:true},
    tipo: {type: String, default:"user"},
    
});

user.methods.findById=function(targetId){
    return this.model('user').findOne({_id: targetId});
}

user.methods.findOne=function(targetNome){
    return this.model('user').findOne({nome: targetNome});
}

const User = mongoose.model('User', user);

module.exports = User;