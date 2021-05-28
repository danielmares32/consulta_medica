const express = require('express');
let app = express();
const BP = require('body-parser');
const urlencodedParser = express.urlencoded({extended:true});
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname+'/consulta-medica/dist/consulta-medica'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/consulta-medica/src/index.html');
});



//Conexión a DB
const mysql = require('mysql');
const bodyParser = require('body-parser');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'consulta_medica'
});

connection.connect();
//API's
app.post('/registroMedico',(req, res)=>{
    console.log('post request');	
    console.log(req.body);	
    let nombre=req.body.nombre;
    let usuario=req.body.usuario;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let disponibilidad=req.body.disponibilidad;
    connection.query(`INSERT INTO medico (nombre,usuario,correo,contraseña,disponibilidad) VALUES('${nombre}','${usuario}','${correo}','${contrasena}',${disponibilidad})`, (err)=>{
        if(err)
            console.error(err);
    });
    res.end('Finalizado registro');
});

app.post('/test',(req,res)=>{
    console.log('test');
    console.log(req.body);
    
    res.send('finalizado TEst');
})

app.post('/loginMedico', (req,res)=>{
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



let server = app.listen("8081", "127.0.0.1" ,function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

