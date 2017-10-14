'use strict'
const uuidv1 = require('uuid/v1')
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const sns = new AWS.SNS();

module.exports.receive = (event, context, callback) => {
  const payload = {
    uuid: uuidv1(),
    metadata: event.body
  }

  console.log(process.env);

  sns.publish({
    Message: JSON.stringify(payload),
    TopicArn: process.env.SNS_TOPIC
  }, function(err) {
    if (err) {
      console.log(err.stack);
      return;
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      payload: payload
    }),
  }

  callback(null, response)
}
