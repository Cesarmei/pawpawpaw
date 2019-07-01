const mongoose = require('mongoose');
let Schema = mongoose.Schema;




//schema user
const userSchema = new Schema({
    username: {type: String, required:true},
    nome: {type: String, required:true},
    password: {type:String, required:true},
    tipo: {type: String, default:"utilizador"},
    
});

/*
userSchema.methods.findById=function(targetId){
    return this.model('user').findOne({_id: targetId});
}

userSchema.methods.findOne=function(targetNome){
    return this.model('user').findOne({nome: targetNome});
}
*/

const User = mongoose.model('User', userSchema);
module.exports = User;