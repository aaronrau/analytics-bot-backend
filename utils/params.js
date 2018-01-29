
/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Rau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var Params = function(){

	var results = {};
	//Argument Processing for misc variables
	results.PORT = Number(process.env.PORT || 8000)
	results.URL = 'http://localhost:'+results.PORT;

	for(var i = 0; i < process.argv.length; i++)
	{
	  var param = process.argv[i]
	  var ps = param.split('=');
	  if(ps[0].indexOf('host_path') > -1)
	  {
	      results.URL = ps[1];    
	  }
	  else if(ps[0].indexOf('port') > -1)
	  {
	      results.PORT = ps[1];  
	      results.URL = 'http://localhost:'+results.PORT;  
	  }
	  else if(ps[0].indexOf('production') > -1)
	  {
	      results.IsProduction = true;   
	  }
	  else if(ps[0].indexOf('design') > -1)
	  {
	      results.IsForDesigner = true;
	  }
	}


	return results;

}
module.exports = Params;