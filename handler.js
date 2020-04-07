'use strict';

const { datadog } = require("datadog-lambda-js");
const tracer = require("dd-trace").init();

// This function will be wrapped in a span
const longCalculation = tracer.wrap('calculation-long-number', () => {
    // An expensive calculation goes here
});

// This function will also be wrapped in a span
module.exports.helloWorld = datadog((event, context, callback) => {
    longCalculation();

    callback(null, {
        statusCode: 200,
        body: 'Hello from serverless!'
    });
});
