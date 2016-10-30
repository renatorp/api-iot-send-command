
var appRouter = function(app) {

var sendc2dmessage = require('../send_cloud_to_device_message.js');

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.get("/iot/api/sendcommand", function(req, res) {
  sendc2dmessage.sendmessage(function(msg) {
  	res.send(msg);
  });
});
}
module.exports = appRouter;

