const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


//schema de uma licitacao
let licitacao = new Schema({
    valor: {type:Number, required:true},
    user: {type: String},
    leilao: {type:ObjectId}
});

//cria mais um dado para adicionar timestamp
licitacao.set('timestamps', true);

licitacao.methods.findById=function(targetId){
    return this.model('licitacao').findOne({_id: targetId});
}

const Licitacao = mongoose.model('Licitacao', licitacao);
module.exports = Licitacao;