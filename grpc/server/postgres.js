const { Client } = require('pg');
const client = new Client({
    user: 'root',
    host: '0.0.0.0',
    database: 'distri',
    password: 'facil123',
    port: 4365
  });
client.connect(function (error){
    if(error){
        console.log("Here we go again");
    }else{
        console.log("Conexion con base de datos fue exitosa");
    }
});