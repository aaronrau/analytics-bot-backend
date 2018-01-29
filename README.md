# Bot Analytics Metric Node JS API Framework

Here's the live API Endpoint
https://analytics-bot-api.herokuapp.com/api


Running the UI 
---------------
1. Clone Repo.
2. Install dependencies & run node **server.js** 

```
$ npm install
$ npm start
```


API Reference
---------------
### HTTP Header
All POSTs require a “Content-Type” header set to “application/json”.

### POST /api/metrics/METRIC_NAME
#### REQUEST
```
$ curl https://analytics-bot-api.herokuapp.com/api/metrics/METRIC_NAME/ \
    -H 'Content-Type: application/json' \
    -d '{"timeframe":"today","timezone":480}'
```
Variables | Values 
------------ | -------------
**METRIC_NAME** | This will be the name of the metric you are looking up. Currently the system only has placeholder values. 
**timeframe** | Only supports the following values for now. **today**, **this_month**, **last_60_days** . Start and end datetime will be added later.  
**timezone** | Only support minutes offset for now. TZ codes such as "PDT" or "EST" will be added later.


#### RESPONSE
```
{
    "metric": "METRIC_NAME",
    "query":
    {
        "timeframe": "today",
        "timezone": 480
    },
    "data": [
    {
        "Date": "2018-01-29T18:06:05.681Z",
        "Category": "Live Agent Request",
        "Subcategory": "Intent",
        "NumUniqUsers": 59,
        "NumMessages": 69,
        "Sentiment": 0.246956525721412,
        "AvgResponseTime": 254.652173913043,
        "BotChannel": "MCOM",
        "Week": null
    },
    {
        "Date": "2018-01-29T18:06:05.681Z",
        "Category": "App",
        "Subcategory": "Help",
        "NumUniqUsers": 1,
        "NumMessages": 1,
        "Sentiment": 0.13,
        "AvgResponseTime": 630,
        "BotChannel": "FacebookMsgr",
        "Week": null
    }]
}
```
DATA Placeholders
---------------
#### Placeholder BI Database mock_bi_system.js
https://github.com/aaronrau/analytics-bot-backend/blob/master/utils/mock_bi_system.js
#### Placeholder BI Adapter mockadapter.js
https://github.com/aaronrau/analytics-bot-backend/blob/master/biadapters/mockadapter.js

The api only has placeholder data for now. You will have to update the **mock_bi_system.js** and **mockadapter.js** to point the query into the correct BI system. **Adapters** are generally used to map the query parameters into the **bi_system**.

/controllers/api.js
---------------
https://github.com/aaronrau/analytics-bot-backend/blob/master/controllers/api.js <br/>
This is the main route for the api. 

/controllers/security.js
---------------
https://github.com/aaronrau/analytics-bot-backend/blob/master/controllers/security.js <br/>
The api is very open right now. You will have to edit the **security.js** file to lock down the system. This is where you can valid session tokens, users ...etc.

/configs/dev.js & /configs/prod.js
---------------
These configurations are loaded in the system, depending if you have --production argument set when running node. 

