var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var logger=require('./logger.js')('edsazure.log');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({extended: true}));
/* serves main page */
app.get("/", function (req, res) {
    res.sendfile('index.html')
});
app.post("/save", function (req, res) {
    /* some server side logic */
    try {
        var config = require('./config.js');
        var data = JSON.parse(req.body.data);
        var service = require('./models/' + req.body.cn + '.js');
        service['save_' + req.body.m](data,config,function(result){
            if (typeof result == 'object')
                res.send(JSON.stringify(result));
            else
                res.send(result);
        },function(ex){
            res.status(500).send(ex.message);
            logger.info(ex.message);
        },logger);

    } catch (ex) {
        res.status(500).send(ex.message);
    }

});
app.get(/^\/load\/(.+)$/, function (req, res) {
    //console.log(req);
    try {
        var config = require('./config.js');
        console.log(req.params[0]);
        var s = req.params[0].split('/');
        var service = require('./models/' + s[0] + '.js');
        service['load_' + s[1]](req.query,config,function(result){
            if (typeof result == 'object'){
                console.log('Object');
                res.send(JSON.stringify(result));
            }
            else
                res.send(result);
        },function(ex){
            res.status(500).send(ex.message);
            logger.info(ex.message);
        },logger);

    } catch (ex) {
        res.status(500).send(ex.message);
    }
});
/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    //console.log(req);
    //console.log('static file request : ' + req.params[0]);
    res.sendFile(__dirname + req.params[0]);
});

var port = 8080;
app.listen(port, function () {
    console.log("Listening on " + port);
});
