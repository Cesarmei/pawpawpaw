const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//contador de leiloes
let cont=0;
function contId(){
    return cont+1;
}

//schema de uma licitaçao
let leilao = new Schema({
	id_leilao:{type: Number, min: 1, max: 500, required:true},
	titulo: {type: String, required:true},
    descriçao: {type: String, required:true},
    base_lct: {type: Number, min: 1,require:true},
    data_fim:{ type: Number, default: (new Date())},
    imagePath: {type: String},
    estado: {type:Boolean, required:true}
});

leilao.methods.findById=function(targetId){
    return this.model('leilao').findOne({id_art: targetId});
}

module.exports = leilaoSchema;