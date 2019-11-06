var express = require('express');
var fs = require('fs');
var app = express();

var msg = process.env.APP_MSG;

var response;

app.get('/', function (req, res) {
    console.log('request');
    res.status(200);
    res.send('#!/bin/bash \n echo "Trying $HOOK_RETRIES times" \n while [ "$HOOK_RETRIES" != 0 ]; do \n echo -n "Checking if MySQL is up\n" \n if mysqlshow -h$MYSQL_SERVICE_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD -P3306 $MYSQL_DATABASE &>/dev/null \n then \n echo \'Database is up\n\' \nbreak \nelse \necho \'Database is down\n\' \nsleep $HOOK_SLEEP \nfi \nlet HOOK_RETRIES=$HOOK_RETRIES-1 \ndone \nif [ "$HOOK_RETRIES" = 0 ]; then \necho \'Too many tries\' \nexit 1 \nfi \n mysql -h$MYSQL_SERVICE_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD -P3306 $MYSQL_DATABASE -e "CREATE TABLE IF NOT EXISTS users (user_id int(10) unsigned NOT NULL AUTO_INCREMENT,nome varchar(100)) ENGINE=InnoDB DEFAULT CHARSET=utf8;"\nmysql -h$MYSQL_SERVICE_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD -P3306 $MYSQL_DATABASE  -e "insert into users(name) values (\'user1\');"'
)});

app.get('/healthz', function (req, res) {
    console.log('healthz');
    res.status(200);
    res.send();
});

app.get('/ready', function (req, res) {
    console.log('ready');
    res.status(200);
    res.send();
});


app.get('/healthz-ko', function (req, res) {
    console.log('healthz-ko');
    res.status(400);
    res.send();
});

app.get('/ready-ko', function (req, res) {
    console.log('ready-ko');
    res.status(400);
    res.send();
});







app.listen(8080, function () {
  console.log('Server listening on port 8080!');
});
