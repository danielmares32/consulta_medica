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
   // console.log('Request: ' +(req.body));
   setTimeout(()=>{
    req.session=ses;
    ses=req.session;
    console.log('Antes: '+ses);
    if(ses.rl!=true)
        ses.rl=true;
    else
        ses.rl=false
    console.log('Despues: '+ses);
    //res.sendFile(__dirname+'/consulta-medica/src/index.html');
    console.log(ses.usuario);
    console.log(ses);
    res.send(ses );
}, 50);
  
});

app.post ('/rl',(req, res)=>{
    // console.log('Request: ' +(req.body));
    req.session=ses;
    ses=req.session;
    ses.rl=req.rl;
    res.send('Actualizado');
   
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

app.post('/agregarReceta', (req,res)=>{
    let idDiagnostico=req.body.idDiagnostico;
    let contenido=req.body.contenido;
    connection.query(`INSERT INTO receta (id_diagnostico, contenido) VALUES('${idDiagnostico}','${contenido}')`, (err)=>{
        if(err)
            console.error(err);
        else
            res.send('{"message":"Correcto"}');
    })
});

app.post('/historialConsultas', (req, res)=>{
    
    let idMedico=req.body.idMedico;
    let JSON1=[];
    connection.query(`SELECT * FROM diagnostico WHERE id_medico='${idMedico}'`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else{ 
            for (const iterator of rows) {
                connection.query(`SELECT nombre FROM paciente WHERE id='${iterator.id_paciente}'`, (err2, rows2, fields2) => {
                    if (err2)
                        console.error(err2);
                    else {
                        JSON1.push({
                            id: iterator.id,
                            id_paciente: iterator.id_paciente,
                            enfermedad: iterator.enfermedad,
                            descripcion: iterator.descripcion,
                            peso: iterator.peso,
                            talla: iterator.talla,
                            temperatura: iterator.temperatura,
                            presion_arterial: iterator.presion_arterial,
                            pulso_cardiaco: iterator.pulso_cardiaco,
                            fecha: iterator.fecha,
                            nombre: rows2[0].nombre
                        });
                    }
                });
            }
            setTimeout(()=>{
                res.send(JSON1);
            }, 100);
        }
    });
});

app.post('/consultasDisponibles', (req, res)=>{
    let JSON1=[];
    connection.query(`SELECT * FROM diagnostico WHERE id_medico IS NULL`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else{ 
            for (const iterator of rows) {
                connection.query(`SELECT nombre FROM paciente WHERE id='${iterator.id_paciente}'`, (err2, rows2, fields2) => {
                    if (err2)
                        console.error(err2);
                    else {
                        JSON1.push({
                            id: iterator.id,
                            id_paciente: iterator.id_paciente,
                            peso: iterator.peso,
                            talla: iterator.talla,
                            temperatura: iterator.temperatura,
                            presion_arterial: iterator.presion_arterial,
                            pulso_cardiaco: iterator.pulso_cardiaco,
                            fecha: iterator.fecha,
                            nombre: rows2[0].nombre
                        });
                    }
                });
            }
            setTimeout(()=>{
                res.send(JSON1);
            }, 100);
        }
    });
});

app.post('/actualizarExpediente', (req, res)=>{
    let idDiagnostico=req.body.idDiagnostico;
    let idMedico=req.body.idMedico;
    let enfermedad=req.body.enfermedad;
    let descripcion=req.body.descripcion;
    connection.query(`UPDATE diagnostico SET id_medico='${idMedico}', enfermedad='${enfermedad}',
                    descripcion='${descripcion}' WHERE id='${idDiagnostico}'`, (err, rows, fields)=>{
        
        if(err)
            console.error(err);
        else
            res.send('{"message":"Correcto"}');
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
            res.end('{"message":"Correcto"}');
    });
    
});

app.post('/loginMedico', (req,res)=>{
    ses=req.session;
    let usuario=req.body.usuario;
    let contrasena=req.body.contrasena;
    let acceso=false;
    connection.query(`SELECT * FROM medico`, (err, rows, fields)=>{
        if(err){
            console.error(err);
        }
            
        for (const iterator of rows) {
            if(iterator.usuario===usuario && iterator.contraseña===contrasena){
                acceso=true;
                let idUsr=iterator.id;
                console.log(idUsr);
                ses.usuario=iterator.usuario;
                ses.idu= String(idUsr) ;
                console.log(ses.id);
                //La disponibildad pasa a ser activa
                connection.query(`UPDATE medico SET disponibilidad=1 WHERE id='${idUsr}'`, (err2, rows2, fields2)=>{
                    if(err2)
                        console.error(err2);
                });
            }
        }

        if(acceso){
            ses.Activo=true;
            res.send('{"message":"True","usr":"'+ses.usuario+ '", "idusr":"'+ses.idu + '"}');
        }
        else{
            connection.query(`SELECT * FROM personal_apoyo`, (err, rows, fields)=>{
                if(err){
                    console.error(err);
                }
                for (const iterator of rows) {
                    if(iterator.usuario===usuario && iterator.contraseña===contrasena){
                        acceso=true;
                        let idUsr=iterator.id;
                        console.log(idUsr);
                        ses.usuario=iterator.usuario;
                        ses.idu= String(idUsr) ;
                        ses.tipo=iterator.tipo;
                        console.log(ses.id);
                     
                    }
                }  
              
        
                if(acceso){
                    ses.Activo=true;
                    res.send('{"message":"True","usr":"'+ses.usuario+ '", "idusr":"'+ses.idu + '"}');
                    
                }
                else{
                    res.send('{"message":"false"}');
                }
            });
        }
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
            res.send('{"message":"Correcto"}');
    });
    
});

app.post('/registrarPersonal', (req, res)=>{
    let nombre=req.body.nombre;
    let usuario=req.body.usuario;
    let contraseña=req.body.contraseña;
    let correo=req.body.correo;
    let tipo=req.body.tipo;
    connection.query(`INSERT INTO personal (nombre,usuario,contraseña,correo,tipo) VALUES('${nombre}','${usuario}','${contraseña}','${correo}','${tipo}')`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.send('{"message":"Correcto"}');
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
                res.send('{"message":"Correcto"}');
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
            res.send('{"message":"Correcto"}');
    });

});

let server = app.listen("8081", "127.0.0.1", function(){

    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

