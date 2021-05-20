const express = require('express');
const path = require('path');
let app = express();

app.use(express.static(__dirname+'/dist'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/consulta-medica/dist/consulta-medica/index.html');
});

let server = app.listen("8081", "127.0.0.1" ,function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
