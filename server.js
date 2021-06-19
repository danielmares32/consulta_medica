const fs = require('fs');
const https = require('https');
const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const  fileUpload = require('express-fileupload');
var mailer= require("nodemailer");
const senderMail = "consultamedicaprof@gmail.com";

const emailTransporter = mailer.createTransport({
            
            service:'gmail',
            secure: false,
            auth: {
               user: senderMail,
               pass: 'Proyecto6to'
            },
            debug: false,
            logger: true 
});
const mysql = require('mysql');
let app = express();
let certificate = fs.readFileSync('./sslcert/server.crt','utf-8');
let privateKey = fs.readFileSync('./sslcert/key.pem', 'utf-8');
let credentials = { key: privateKey, cert: certificate };
let httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpsServer);
var ses;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname+'/consulta-medica/dist/consulta-medica'));
app.use(fileUpload());

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



app.post('/', (req, res)=>{
    req.session=ses;
    ses=req.session;
    console.log('Request: ' +(req.body));
    setTimeout(()=>{
        console.log('Antes: '+ses);
        if(ses!=null){
            if(!ses.rl)
                ses.rl=true;
            else
                ses.rl=false;
        console.log('Despues: '+ses);
        //res.sendFile(__dirname+'/consulta-medica/src/index.html');
        console.log(ses.usuario);
        console.log(ses);
        res.send(ses);
        }
    }, 50);  
});

app.get('/inicio', (req,res)=>{
    res.sendFile(__dirname+'/consulta-medica/dist/consulta-medica/index.html');
});

app.get('/CerrarSes', (req, res)=>{
    req.session.destroy();
    ses.destroy();   
    req.session=null;
    ses=null;
    console.log('Despues de destruir');
    console.log(ses);
    
 });

app.post ('/rl',(req, res)=>{
    console.log('Request: ' +(req.body));
    req.session=ses;
    ses=req.session;
    ses.rl=req.rl;
    res.send('Actualizado');
});

//Conexión a DB
//const mysql = require('mysql');
//const bodyParser = require('body-parser');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'consulta_medica'
}); 
connection.connect();

//API's

app.post('/llamadas', (req, res)=>{
    let JSON1=[];
    connection.query(`SELECT * FROM diagnostico WHERE enfermedad IS NULL`,(err,rows,fields)=>{
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

app.post('/llamandoPaciente', (req, res)=>{
    let idConsulta=req.body.idConsulta;
    let idMedico=req.body.idMedico;
    console.log(idConsulta+'id medico: '+idMedico);
    connection.query(`UPDATE diagnostico SET id_medico='${idMedico}' WHERE id='${idConsulta}'`, (err, rows, fields)=>{
        if(err)
            console.error(err);
        else
            res.send('{"message":"Correcto"}');
    });
});

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
    console.log(nombre);
    connection.query(`INSERT INTO medico (nombre,usuario,correo,contraseña,disponibilidad) VALUES('${nombre}','${usuario}','${correo}','${contrasena}','${disponibilidad}')`, (err)=>{
        if(err)
            console.error(err);
        else{
            //res.end('{"message":"Correcto"}');
            
var mailOptions = { from: '', to: correo, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/login\/?id=' + usuario /*token.token*/ + '.\n' };
            emailTransporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); } 
                res.status(200).send('A verification email has been sent to ' + usuario + '.');
            });
        }
            
    });
    
});


app.post('/confirmar',(req, res)=>{
    console.log('post request');	
   
    console.log(req.body);	
    let nombre=req.body.nombre;
    let usuario=req.body.usuario;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let disponibilidad=req.body.disponibilidad;
    console.log(nombre);
    connection.query(`INSERT INTO medico (nombre,usuario,correo,contraseña,disponibilidad) VALUES('${nombre}','${usuario}','${correo}','${contrasena}','${disponibilidad}')`, (err)=>{
        if(err)
            console.error(err);
        else{
            //res.end('{"message":"Correcto"}');
            
var mailOptions = { from: '', to: correo, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/login?id=' + usuario /*token.token*/ + '.\n' };
            emailTransporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); } 
                res.status(200).send('A verification email has been sent to ' + usuario + '.');
            });
        }
            
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
            res.send('{"message":"Paciente Registrado"}');
            
    });
    
});

app.post('/registrarPersonal', (req, res)=>{
    let nombre=req.body.nombre;
    let usuario=req.body.usuario;
    let contraseña=req.body.contraseña;
    let correo=req.body.correo;
    let tipo=req.body.tipo;
    connection.query(`INSERT INTO personal_apoyo (nombre,usuario,contraseña,correo,tipo) VALUES('${nombre}','${usuario}','${contraseña}','${correo}','${tipo}')`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.send('{"message":"Personal Registrado"}');
            
    });
    
});

//sacar lista de pacientes
app.post('/ListaPacientes', (req, res)=>{
    let JSON1=[];
    connection.query(`SELECT * FROM paciente WHERE disponibilidad=0 `,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else{ 
            for (const iterator of rows) {
                              
                    JSON1.push({
                            
                            id_paciente: iterator.id,
                            nombre: iterator.nombre
                        });    
            }
            setTimeout(()=>{
                res.send(JSON1);
            }, 100);
        }
    });
});

//fin de sacar lista pacientes

//sacar lista de doctores activos
app.post('/ListaDoctores', (req, res)=>{
    let JSON2=[];
    connection.query(`SELECT * FROM paciente  WHERE disponibilidad=1 `,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else{ 
            for (const iterator of rows) {
                              
                    JSON2.push({
                            
                            nombre: iterator.nombre
                        });    
            }
            setTimeout(()=>{
                res.send(JSON2);
            }, 100);
        }
    });
});



//fin de sacar lista de doctores activos

//registrar analisis
app.post('/registrarAnalisisDB', (req,res)=>{
    let idPaciente=req.body.idPaciente;
    let tipoAnalisis=req.body.tipoAnalisis;
    let fecha=req.body.fecha;
    let ruta=req.body.ruta;
    connection.query(`INSERT INTO resultados_laboratorio (id_paciente,documento,tipo_de_analisis,fecha) VALUES(${idPaciente},'${ruta}','${tipoAnalisis}','${fecha}')`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.send('{"message":"Correcto"}');
    });
});

app.post('/registrarAnalisis', (req, res)=>{
   
    let archivo;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files);
    console.log(req.files.archivo);
    console.log(req.files.archivo.name);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    archivo = req.files.archivo;
    uploadPath = `${__dirname}/analisisPacientes/${archivo.name}`;
    
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, function(err) {
      console.log(uploadPath);
      if (err)
        return res.status(500).send(err);
      res.send('{"message":"File uploaded!"}');
    });
    
}); 
//fin de registrar analisis


//registrar datos previo consulta
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
    });
    connection.query(
        `UPDATE  paciente SET disponibilidad=1 WHERE id='${id_paciente}'`, (err, rows,fields)=>{
                if(err)
                    console.error(err);
                else
                    res.send('{"message":"Correcto"}');
        });
});
//fin registro previo consulta

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

io.on('connection', (socket)=>{
    socket.on('join-room', (roomId, userId) => {
        console.log('El roomid es '+roomId);
        console.log('El userId es '+userId);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
        socket.on('disconnect', ()=>{
            socket.to(roomId).emit('user-disconnected', userId);
        })
    })
})

let server = httpsServer.listen("8081", "127.0.0.1", function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

