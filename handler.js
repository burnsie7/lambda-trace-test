'use strict';

const { datadog } = require("datadog-lambda-js");
const tracer = require("dd-trace").init();

// This function will be wrapped in a span
const someFunction = tracer.wrap('some-function', () => {
    // An expensive calculation goes here
});

// This function will also be wrapped in a span
module.exports.helloworld = datadog((event, context, callback) => {
    someFunction();
    callback(null, {
        statusCode: 200,
        body: 'Hello from serverless!'
    });
});
