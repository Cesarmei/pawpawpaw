const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/*
//contador de telemoveis
let cont=0;
function contId(){
    return cont+1;
}*/

//schema de uma licitaçao
let telemoveis = new Schema({
    marca: {type: String, required:true},
    modelo: {type: String, required:true},
    descricao: {type: String, required:true},
    preçoInicial: {type: Number, min: 0,require:true},
    user:{type: String},
    dataFim:{ type: Date, default: (new Date()), required:true},
    imagem: {type: String},
    estado: {type: String, required:true}
});

telemoveis.methods.findById=function(targetId){
    return this.model('telemoveis').findOne({_id: targetId});
}

const Telemovel = mongoose.model('Telemovel', telemoveis);
module.exports = Telemovel;