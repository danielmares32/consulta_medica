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
    console.log('ID: '+rows[0].id+'\nNombre: '+rows[0].nombre);
});

connection.end();