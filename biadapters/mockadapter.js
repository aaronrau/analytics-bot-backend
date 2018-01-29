/*
The MIT License (MIT)
Copyright (c) 2015 Aaron Rau

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var moment = require('moment'),
	MOCKBI = require("../utils/mock_bi_system.js");
//AR: Mock Adapter for now

var _convertTimeFrameToStartEnd = function(frame,utcOffsetMinutes){


	if(typeof frame === "string")
	{
		//find top of the hour
		var now = moment().add(utcOffsetMinutes, 'minutes'); //Assume Server UTC
			now = now.hour(0).minute(0).second(0);

		var time ={
			start:null,
			end:0
		}

		switch(frame)
		{
			case "today":
			
				time.start = now.toDate();
				time.end = now.hour(24).toDate();

				return time;

			case "this_month":

				time.start = now.date(1).hour(0).minute(0).second(0).toDate();
				time.end = now.date(31).hour(0).minute(0).second(0).toDate();


				return time;

			case "last_60_days":

				time.start = moment().add(utcOffsetMinutes, 'minutes').hour(0).minute(0).second(0).subtract(60,'days').toDate();
				time.end = now.hour(24).toDate();

				
				return time;
			default:
				break;
		}
	}
	else //probably already time object
	{
		if(frame.start || frame.end)
			return frame;
		else
			return {
				start:new Date(),
				end:new Date()
			}
	}

}


module.exports = {
	getData:function(user,metric,query,callback){

		//AR: need to map query to BI spec here
		
		var dataQuery = {};

		dataQuery.metric = metric;
		dataQuery.time = _convertTimeFrameToStartEnd(query.timeframe,query.timezone);
		dataQuery.timeframe = query.timeframe;


		if(!query)
		{
			var err = new Error("Invalid Query");
			err.status = 400;

			callback(err)
		}
		else
		{

			MOCKBI.find(dataQuery,function(results){
				callback(null,results);	
			})
			
		}
	}
}