var express = require('express');
var router = express.Router();
var sendc2dmessage = require('../send_cloud_to_device_message.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/iot/api/sendcommand", function(req, res) {
  sendc2dmessage.sendmessage(function(msg) {
  	res.send(msg);
  });
});

module.exports = router;
