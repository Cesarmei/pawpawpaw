const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//contador de artigos
let cont=0;
function contId(){
    return cont+1;
}

//schema de uma licitaçao
let artigo = new Schema({
	id_art:{type: Number, min: 1, max: 500, required:true},
	titulo: {type: String, required:true},
    descriçao: {type: String, required:true},
    base_lct: {type: Number, min: 1,require:true},
    data_fim:{ type: Number, default: (new Date())},
    id_vendedor:{type: Number, min: 1, max: 500, required:true},
    vendedor:{type: String, required:true},
    imagePath: {type: String}
});

artigo.methods.findById=function(targetId){
    return this.model('artigo').findOne({id_art: targetId});
}

module.exports = artigoSchema;