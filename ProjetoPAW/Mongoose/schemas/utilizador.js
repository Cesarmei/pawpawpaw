const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//contador de ids dos utilizadores
let cont=0;
function contId(){
    return cont+1;
}

//schema utilizador
let utilizador = new Schema({
    id_user: {type: Number, min: 1, max: 500, required:true},
    nome: {type: String, required:true},
    password: {type:String, required:true},
    tipo: {type: String, require:true},
    genero: {type: String, require:true},
    numProdSubmetidos: {type: Number},
    leiloesGanhos: {type: Number}
});

utilizador.methods.findById=function(targetId){
    return this.model('utilizadores').findOne({id_user: targetId});
}

module.exports = utilizador;