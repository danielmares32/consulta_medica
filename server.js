const express = require('express');
const session = require('express-session'); 
const fileUpload= require('express-fileupload');
let app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname+'/consulta-medica/dist/consulta-medica'));
app.use(fileUpload);

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
    req.session=ses;
    ses=req.session;
   
    
   
    
    console.log('Request: ' +(req.body));
   setTimeout(()=>{
 
    console.log('Antes: '+ses);
    if(ses!=null){
        if(ses.rl!=true)
        ses.rl=true;
    else
        ses.rl=false
    console.log('Despues: '+ses);
    //res.sendFile(__dirname+'/consulta-medica/src/index.html');
    console.log(ses.usuario);
    console.log(ses);
    res.send(ses );
    }
   
}, 50);
  
  
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
const mysql = require('mysql');
const bodyParser = require('body-parser');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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
    connection.query(`INSERT INTO personal_apoyo (nombre,usuario,contraseña,correo,tipo) VALUES('${nombre}','${usuario}','${contraseña}','${correo}','${tipo}')`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.send('{"message":"Correcto"}');
    });
    
});
//registrolab
app.post('/registrarAnalisis', (req, res)=>{
   
    let archivo;
    let uploadPath;
    let id_paciente;
    let tipo;
    let fecha;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    archivo = req.files.archivo;
    id_paciente=req.body.idp;
    tipo=req.body.tipo;
    fecha=req.body.fecha;
    uploadPath = __dirname + './analisis' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');


    });
    connection.query(`INSERT INTO resultados_laboratorio (id_paciente,documento,tipo_de_analisis,fecha) VALUES(${id_paciente},'${ uploadPath}','${tipo}','${fecha}')`,(err,rows,fields)=>{
        if(err)
            console.error(err);
        else    
            res.send('{"message":"Correcto"}');
    });
});
//fin del registrolab


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
    connection.query(`SELECT * FROM pacientes  WHERE disponibilidad=1 `,(err,rows,fields)=>{
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

    connection.query(
        `UPDATE paciente disponibilidad=1 WHERE id_paciente='${id_paciente}'`,(err, rows,fields)=>{
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

