var PROTO_PATH = './proto/client.proto';

var parseArgs = require('minimist');
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
var client_proto = grpc.loadPackageDefinition(packageDefinition).client;

var argv = parseArgs(process.argv.slice(2), {
  string: 'target'
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  target = 'localhost:8080';
}
var client = new client_proto.Casos(target,grpc.credentials.createInsecure());

module.exports = client;
