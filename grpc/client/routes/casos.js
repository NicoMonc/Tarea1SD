var express = require('express');
var router = express.Router();
const client = require('../gRPC_client')

router.get('/todos',  function(req, res) {
    const rows = [];

    const call = client.Prueba();
    call.on('data', function(data) {
        rows.push(data);
    });
    call.on('end', function() {
        console.log('Data obtenida con exito');
        res.status(200).json({data:rows});
    });
    call.on('error', function(e) {
        console.log('Error en entrega',e);
    });
});

router.get('/title/:text',  function(req, res) {

    const rows = [];
    const text = req.params.text;
    console.log(text);
    const call = client.ListarTitle(text);
    call.on('data', function(data) {
        rows.push(data);
    });
    call.on('end', function() {
        console.log('Data obtenida con exito');
        res.status(200).json({data:rows});
    });
    call.on('error', function(e) {
        console.log('Error en entrega',e);
    });
});

module.exports = router;
