'use strict';

module.exports.logger = (event, context, callback) => {
  console.log(JSON.stringify(event));
  callback(null);
};
