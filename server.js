/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Rau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Argument Processing for misc variables
var PARAMS = require('./utils/params.js')();
var port = PARAMS.PORT;
var URL = PARAMS.URL;

//Application specific configuration
var CONFIG = require('./configs/dev.js');
if(PARAMS.IsProduction){
  console.log("-=[PROD]=-")
    CONFIG = require('./configs/prod.js');
}
else
{
  console.log("-=[DEV]=-")
}

//Includes
var express = require('express'),
	exphbs  = require('express-handlebars');

//Controllers & Sub Apps
var errors = require('./controllers/errors.js'),
	api = require('./controllers/api.js'),
	security = require('./controllers/security.js');

var app = express(),
    server = require('http').Server(app);


// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir:__dirname+'/views/layouts'
    });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//setup security 
app.use(security.handler);

//setup static routes
app.use('/css', express.static(__dirname+'/public/css'));
app.use('/images', express.static(__dirname+'/public/images'));

//setup sub apps
app.use('/api',api);

//setup error handling
app.use(errors.missingPage);
app.use(errors.others);
console.log("Running on port:"+port);
server.listen(port);