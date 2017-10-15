'use strict';
const uuidv1 = require('uuid/v1')
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.logger = (event, context, callback) => {
  console.log(JSON.stringify(event));
  var messageText = event.Records[0].Sns.Message;
  var message = JSON.parse(messageText);
  submitEvent(message);
  callback(null);
};

const submitEvent = event => {
  console.log('Submitting event');
  const timestamp = new Date().getTime().toString();
  dynamodb.putItem({
    "TableName": process.env.LEDGER_TABLE,
    "Item": {
      "id": {"S": uuidv1()},
      "uuid": {"S": event.uuid},
      "type": {"S": "metadata"},
      "data": {"S": event.metadata},
      "created": {"S": timestamp}
    }
  }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('put successful');
    }
  });
};