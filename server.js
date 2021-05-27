const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
let app = express();

const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static(__dirname+'/consulta-medica/dist/consulta-medica'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/consulta-medica/src/index.html');
});

//Conexión a DB
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consulta_medica'
});

connection.connect();
//API's
app.post('/registroMedico', urlencodedParser, (req, res)=>{
    let nombre=req.body.nombre;
    let usuario=req.body.usuario;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let disponibilidad=req.body.disponibilidad;
    connection.query(`INSERT INTO medico VALUES(${nombre},${usuario},${correo},${contrasena},${disponibilidad})`, (err)=>{
        if(err)
            console.error(err);
    });
});

app.post('/loginMedico', urlencodedParser, (req,res)=>{
    let usuario=req.body.usuario;
    let contrasena=req.body.constrasena;
    connection.query(`SELECT * FROM medico`, (err, rows, fields)=>{
        if(err)
            console.error(err);
        for (const iterator of rows) {
            if(iterator.usuario===usuario && iterator.contrasena===contrasena){
                //Accion de entrar
            }
        }
        //No se encontro negar access
    })
});

connection.end();

let server = app.listen("8081", "127.0.0.1" ,function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});