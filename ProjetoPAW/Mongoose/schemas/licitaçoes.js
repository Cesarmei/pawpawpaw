const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//contador de licitaçoes
let cont=0;
function contId(){
    return cont+1;
}

//schema de uma licitaçao
let licitaçao = new Schema({
    id_lct: {type: Number, min: 1, max: 500, required:true},
    id_user: {type: Number, min: 1, max: 500, required:true},
    licitacao: {type:Number, required:true},
    timestamp: { type: Number, default: (new Date()).getTime()}
});

licitacao.methods.findById=function(targetId){
    return this.model('licitacao').findOne({id_lct: targetId});
}

module.exports = licitacao;