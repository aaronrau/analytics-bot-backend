/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Rau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var _this = {
	getUser:function(req,res,next,callback){
		//AR: mock this for now and return valid user data for a given token, null if invalid.
		//This can be moved to a user management controller later;
		var isValidUser = true;

		if(req.path.indexOf('hackme') > -1)
			isValidUser = false;

		if(isValidUser)
		{
			callback({
				user:{
					_id:"someuserId",
					name:"User fullname"
				},
				accountId:"account_no_123"
			});
		}
		else
		{
			//AR: can call back with null or throw error or send permission denied error
			var err = new Error('Unauthorized');
		    err.status = 401;
		    return next(err);

			//.render('access_error');
			
		}


	},
	handler:function(req, res, next){



		//AR: Add security requirements here ex: redirect to https or check token
		/*
		if (req.headers['x-forwarded-proto'] !== 'https') {
	        return res.redirect(['https://', req.get('Host'), req.url].join(''));
	    }
	    */
	    //Open CORS 
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,'DELETE");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sender, session, session_token, socket");

	    
	    //AR: Check header tokens here
		return next();
	}
}
module.exports = _this;