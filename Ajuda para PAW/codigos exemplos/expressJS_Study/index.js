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

app.listen(3000,()=> console.log('listening on port 3000...'));
