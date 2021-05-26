const express = require('express');
const path = require('path');
let app = express();

app.use(express.static(__dirname+'/consulta-medica/src/index'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/consulta-medica/src/index.html');
});

let server = app.listen("8081", "127.0.0.1" ,function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

//Conexion.js
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consulta_medica'
});

connection.connect();

connection.query('SELECT * FROM paciente', function(err, rows, fields){
    if(err)
        console.error(err);
        console.log(rows);
        console.log(fields);
   console.log('ID: '+rows[0].id+'\nNombre: '+rows[0].nombre);
});

connection.end();

