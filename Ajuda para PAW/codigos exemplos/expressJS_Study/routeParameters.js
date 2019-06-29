const express = require('express');
const app = express();

// '/' aqui significa o "root" do website
app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send([1, 2, 3]);
});

//rota para pesquisar um certo elemento 
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:yeah/:month',(req,res)=>{
    //res.send(req.params); //devolve ano 2018 e mes 1
    res.send(req.query); //ler core string parameters
});

/*
dois parametros --> app.get('/api/posts/:year/:month',(req,res)=>{
*/


//PORT 
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));

