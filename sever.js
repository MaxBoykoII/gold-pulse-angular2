var express = require('express');
var request = require('request');

var app = express();

/* GoldMinerPulse API urls*/
var demo_base = 'http://goldminerpulse.com/ngp/edp-api-v3a.php?';
var valid_dates = 'http://goldminerpulse.com/ngp/valid-dates-api.php';

/* API for configuring app */
var configAPI = 'http://goldminerpulse.com/ngp/config.php';

/* serve public */
app.use(express.static(__dirname + '/public'));

/* routes for querys and valid dates*/
app.get('/edp-api-v3a.php', (req, res) => {
    var ymd = req.query.m;
    var hp = req.query.hp;

    var query = request(demo_base + 'm=' + ymd + '&hp=' + hp);

    query.pipe(res);
    query.on('end', function() {
        res.end();
    });
});

app.get('/valid-dates-api.php', (req, res) => {
    var query = request(valid_dates);
    query.pipe(res);
    query.on('end', () => {
        res.end();
    });
});

/* App configuration route */
app.get('/config.php', (req, res) => {
    var query = request(configAPI);
    query.pipe(res);
    query.on('end', () => {
        res.end();
    });
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log("server is listening...");
});
