const express = require('express');
const session = require('express-session'); 
let app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname+'/consulta-medica/dist/consulta-medica'));

app.use(session({
  
    // It holds the secret key for session
    secret: 'Your_Secret_Key',
  
    // Forces the session to be saved
    // back to the session store
    resave: true,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))

var ses;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res)=>{
    ses=req.session;
    res.sendFile(__dirname+'/consulta-medica/src/index.html');
});

//Conexión a DB
const mysql = require('mysql');
const bodyParser = require('body-parser');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''/*'password'*/,
    database: 'consulta_medica'
}); 
connection.connect();

//API's

app.post('/login',(req, res)=>{
    console.log('login post request');	
    console.log(req.body);	
    let usuario=req.body.usuario;
    let contrasena=req.body.contrasena;
    connection.query(`SELECT * FROM medico where usuario='${usuario}' and contraseña='${contrasena}'`, function(err,result, fields){
        if(err){
            console.error(err);
            res.send('Login incorrecto');
            
        }
            
        else{
            ses=req.session;
            ses.usuario=usuario;
            
            console.log(result);
             res.send('Login  Correcto');
            
        }
     });
    

    
});

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
        else
            res.end('Correcto');
    });
    
});

app.post('/loginMedico', (req,res)=>{
    let usuario=req.body.usuario;
    let contrasena=req.body.constrasena;
    let acceso=false;
    connection.query(`SELECT * FROM medico`, (err, rows, fields)=>{
        if(err)
            console.error(err);
        for (const iterator of rows) {
            if(iterator.usuario===usuario && iterator.contrasena===contrasena){
                acceso=true;
                let idUsr=iterator.id;
                //La disponibildad pasa a ser activa
                connection.query(`UPDATE medico SET disponibilidad=1 WHERE id=${idUsr}`, (err2, rows, fields)=>{
                    if(err2)
                        console.error(err2);
                });
            }
        }
        res.end(acceso);
    });
});

app.post('/registrarPaciente', (req, res)=>{
    let nombre=req.body.nombre;
    let fecha_nacimiento=req.body.fecha_nacimiento;
    let telefono=req.body.telefono;
    let disponibilidad=req.body.disponibilidad;
    connection.query(`INSERT INTO paciente (nombre,fecha_nacimiento,telefono,disponibilidad) VALUES('${nombre}','${fecha_nacimiento}','${telefono}',${disponibilidad})`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.end('Correcto');
    });
    
});

app.post('/consulta', (req, res)=>{
    let id_paciente=req.body.id_paciente;
    let peso=req.body.peso;
    let talla=req.body.talla;
    let temperatura=req.body.temperatura;
    let presion_arterial=req.body.presion_arterial;
    let pulso_cardiaco=req.body.pulso_cardiaco;
    let fecha=req.body.fecha;
    connection.query(
        `INSERT INTO diagnostico (id_paciente,peso,talla,temperatura,presion_arterial,
        pulso_cardiaco,fecha) VALUES('${id_paciente}','${peso}','${talla}','${temperatura}',
        '${presion_arterial}','${pulso_cardiaco}','${fecha}')`, (err, rows,fields)=>{
            if(err)
                console.error(err);
            else
                res.end('Correcto');
    });
});

app.post('/consultaMedico', (req, res)=>{
    let idDiagnostico=req.body.idDiagnostico;
    let id_medico=req.body.id_medico;
    let enfermedad=req.body.enfermedad;
    let descripcion=req.body.descripcion;
    connection.query(`UPDATE diagnostico SET id_medico='${id_medico}',
    enfermedad='${enfermedad}', descripcion='${descripcion}' WHERE id=${idDiagnostico}`, (err, rows, fields)=>{
        if(err)
            console.error(err);
        else
            res.end('Correcto');
    });

});

let server = app.listen("8081", "127.0.0.1", function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

