
/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Rau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var biadapter = require("../biadapters/mockadapter.js");

var express = require("express"),
	bodyParser = require('body-parser'),
	app = express(),
	security = require("./security.js");


// parse application/json
app.use('/',bodyParser.json())
app.get('/', function (req, res) {
  res.render('api',{});
});


app.post('/metrics/:metricname', function (req, res,next) {
	/*
	AR: Query format 
	{
		timeframe:"today" //AR: future //Allow to start & end
		timezone: UTC offset in minutes //AR: allow timezone code in the future //https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	}
	*/


	var query = req.body;

	console.log('metric query for:'+req.params.metricname);	
	console.log(query);

	security.getUser(req,res,next,function(user){

		biadapter.getData(user,req.params.metricname,query,function(error,results){
			res.send({metric:req.params.metricname,query:query,data:results});
		})

	});
	
});


//AR: Couple of different ways of handling this in the future we can use sub apps, dynamic handlers ..etc
// app.get('/:endpoint', function (req, res) {
// 	var dynamicController = require('./api/'+name+'/'+req.params.endpoint+'.js');
//     if(dynamicController)
//     {
//     	dynamicController(req,res,next);
//     }
//     else
//     {
//     	console.log('Did not find ./api/'+name+'/'+req.params.endpoint+'.js')
//     	res.send(404);
//     }
// });


module.exports = app;