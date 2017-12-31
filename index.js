'use strict'

var restify  = require('restify');
var Product = require('./controllers/ProductController');

var ip = '127.0.0.1';
var port = '1234';


var server = restify.createServer({
    name: 'ProductServer'
});

server.listen(port,ip,function () {
    console.log("ProductServer is running");
});


var myarray = new Object();
    myarray.id = "1";
    myarray.name = "Carlos";
    myarray.description = "mydescription";
    myarray.price = 500;

var myarray2 = new Object();
    myarray2.id = "2";
    myarray2.name = "Carlos2";
    myarray2.description = "mydescription2";
    myarray2.price = 600;

var myarray3 = new Object();
    myarray3.id = "3";
    myarray3.name = "Carlos3";
    myarray3.description = "mydescription3";
    myarray3.price = 700;

var result = [];
    result.push(myarray);
    result.push(myarray2);
    result.push(myarray3);


server.get('/products', function(req, res, next) {
    res.header('content-type', 'json');
    res.send(200, {data:result});
    return next();
});

server.post('/products', function(req, res, next) {
    res.header('content-type', 'json');
    res.send(200, {data:result});
    return next();
});

server.put('/products', function(req, res, next) {
    res.header('content-type', 'json');
    res.send(200, {data:result});
    return next();
});

server.del('/products/:id', function(req, res, next) {
    res.header('content-type', 'json');
    res.send(200, {data:result});
    return next();
});

server.get('/.*/', restify.plugins.serveStatic({
        directory: __dirname + "/",
        default: './index.html'

    })
);

