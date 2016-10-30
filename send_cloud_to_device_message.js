'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = 'HostName=renatorp-ot-labs.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=q1j7WtR2RokzUl0N/XmKyi4iPLOBGlQO17rdYhJxU1I=';

//var connectionString = 'HostName=renatorp-ot-labs.azure-devices.net;SharedAccessKeyName=iothubowner;DeviceId=iot-led-status;SharedAccessKey=+mkvewWvj2UGJGBYNx1clG2KwA5G73rLcyZjs0j5SFU=';
var targetDevice = 'iot-led-status';

var serviceClient = Client.fromConnectionString(connectionString);


var sendmessage = function(callbackReturn) {

function receiveFeedback(err, receiver){
  receiver.on('message', function (msg) {
    console.log('Feedback message:')
    console.log(msg.getData().toString('utf-8'));
    callbackReturn(msg.getData().toString('utf-8'));
  });
}

serviceClient.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.stack);
  } else {
    console.log('Service client connected');
    serviceClient.getFeedbackReceiver(receiveFeedback);
    var message = new Message('1');
    message.ack = 'full';
    message.messageId = "My Message ID";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));
  }
});
};
// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    } else {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}

module.exports.sendmessage = sendmessage;
