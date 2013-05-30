
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , beproxy = require('./routes/beproxy')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/bytengine/docs/', beproxy.helpAll);
app.get('/bytengine/docs/:command', beproxy.helpCommand);
app.post('/bytengine/login', beproxy.login);
app.post('/bytengine/run', beproxy.run);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
