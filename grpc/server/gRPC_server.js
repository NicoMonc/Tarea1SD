var PROTO_PATH = './proto/server.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var server_proto = grpc.loadPackageDefinition(packageDefinition).server;

const postgres = require('./postgres');

function ListarID(request, response) {
  const text = parseInt(request.params.text);
  const query = "SELECT * FROM logs where id='"+text+"';";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function Prueba(response) {
  const query = "SELECT count(*) as conteo FROM logs;";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function ListarTitle(request, response) {
  const text = request.params.text;
  const query = "SELECT * FROM logs where title LIKE '"+text+"';";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function ListarDesc(request, response) {
  const text = request.params.text;
  const query = "SELECT * FROM logs where description LIKE '"+text+"';";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function ListarKey(request, response) {
  const text = parseInt(request.params.text);
  const query = "SELECT * FROM logs where keywords='"+text+"';";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function ListarURL(request, response) {
  const text = request.params.text;
  const query = "SELECT * FROM logs where URL LIKE '"+text+"';";

  postgres.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      response.write(data);
    }
    response.end();
  });
  
}

function main() {
  var server = new grpc.Server();
  server.addService(server_proto.Casos.service, {
    ListarID: ListarID,
    ListarTitle: ListarTitle,
    ListarDesc: ListarDesc,
    ListarKey: ListarKey,
    ListarURL: ListarURL,
    Prueba: Prueba
  });
  server.bindAsync('0.0.0.0:8080', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server on port 8080')
  });
}

main();