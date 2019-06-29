//     Environment Variables


const express = require('express');
//nossa aplicação
const app = express();

// '/' aqui significa o "root" do website
app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send([1, 2, 3]);
});

//PORT (variavel global da porta do server)
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));

/*
definir PORT (linha de comandos):
    - export PORT=5000
    - nodemon index2.js
*/