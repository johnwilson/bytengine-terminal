/*------------------------------------------------------------------------------
    Bytengine Proxy Handlers
------------------------------------------------------------------------------*/

var client = require("http");
var qstring = require("querystring");

var BYTENGINE_HOST = "www.bytengine.com";
var BYTENGINE_PORT = 80;

//-------  All Commands Handler  ------------

exports.helpAll = function(req, res) {
    var options = {
        host: BYTENGINE_HOST,
        port: BYTENGINE_PORT,
        path: "/static/commands/all.json"
    };
    client.get(options, function(response){
        res.writeHeader(response.statusCode, response.headers);
        response.on("data", function(chunk){
            res.write(chunk);
        });
        response.on("end", function(){
            res.end();
        });
    }).on("error", function(err){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write("[]");
        res.end();
    });
}

//-------  Command Help Handler  ------------

exports.helpCommand = function(req, res) {
    var options = {
        host: BYTENGINE_HOST,
        port: BYTENGINE_PORT,
        path: "/static/commands/" + req.params.command + ".html"
    };
    client.get(options, function(response){
        res.writeHeader(response.statusCode, response.headers);
        response.on("data", function(chunk){
            res.write(chunk);
        });
        response.on("end", function(){
            res.end();
        });
    }).on("error", function(err){
        res.writeHead(500, {"Content-Type": "plain/text"});
        res.write("server error.");
        res.end();
    });
}

//-------  Login Handler  ------------

exports.login = function(req, res) {
    var postdata = qstring.stringify(req.body);
    var options = {
        host: BYTENGINE_HOST,
        port: BYTENGINE_PORT,
        path: "/bfs/prq/login",
        method:"POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postdata.length
        }
    };
    
    var request = client.request(options, function(response){
        res.writeHeader(response.statusCode, response.headers);
        response.on("data", function(chunk){
            res.write(chunk);
        });
        response.on("end", function(){
            res.end();
        });
    })
    request.on("error", function(err){
        res.writeHead(500, {"Content-Type": "plain/text"});
        res.write("server error.");
        res.end();
    });
    request.write(postdata);
    request.end();
}

//-------  Run Script Handler  ------------

exports.run = function(req, res) {
    var postdata = qstring.stringify(req.body);
    var options = {
        host: BYTENGINE_HOST,
        port: BYTENGINE_PORT,
        path: "/bfs/prq/run",
        method:"POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postdata.length
        }
    };
    
    var request = client.request(options, function(response){
        res.writeHeader(response.statusCode, response.headers);
        response.on("data", function(chunk){
            res.write(chunk);
        });
        response.on("end", function(){
            res.end();
        });
    })
    request.on("error", function(err){
        res.writeHead(500, {"Content-Type": "plain/text"});
        res.write("server error.");
        res.end();
    });
    request.write(postdata);
    request.end();
}