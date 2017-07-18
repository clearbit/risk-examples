const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const clearbit = require('clearbit')();

const testIP = '74.101.143.14';

app.use(bodyParser.urlencoded());
app.use(requestIp.mw());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.post('/', function (req, res) {
  var ip = req.clientIp;

  // For testing purposes
  if (ip == '::1') ip = testIP;

  clearbit.Risk.calculate({
    email: req.body.email,
    name:  req.body.name,
    ip:    ip
  }).then(function (result) {
    console.log(result);
    res.send(result);

  }).catch(function (err) {
    // In case of network/server errors
    console.error(err);
    res.send(err);
  });
})

app.listen(3000, function () {
  console.log('Example Clearbit Risk app listening on port 3000!');
})
