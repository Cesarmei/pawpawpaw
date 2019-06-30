const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


//schema de uma licitacao
let licitacao = new Schema({
    _id: {type: Number, min: 1, max: 500, required:true},
    user: {type: String, required:true},
    licitacao: {type:Number, required:true},
    id_telemovel: {type:ObjectId, required:true}
});

//cria mais um dado para adicionar timestamp
licitacao.set('timestamps', true);

licitacao.methods.findById=function(targetId){
    return this.model('licitacao').findOne({_id: targetId});
}

module.exports = licitacao;