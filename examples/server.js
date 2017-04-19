/**
 * Webhooks Example Server. Note that Layer will only talk to an https server, so make sure to setup
 * an ssl folder before running.
 */

var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();

// Setup environmental variables
require('dotenv').load();
if (!process.env.LAYER_BEARER_TOKEN) return console.error('LAYER_BEARER_TOKEN missing in your environmental variables');
if (!process.env.LAYER_APP_ID) return console.error('LAYER_APP_ID missing in your environmental variables');
var PORT = process.env.WEBHOOK_PORT || '443';
var HOST = process.env.HOST || 'localhost';
if (HOST.indexOf('https://') !== 0) HOST = 'https://' + HOST;

var SECRET = 'Frodo is a Dodo';

// LayerWebhooks is needed to create a webhooks service
var webhooksServices = require('../src/index');
var webhooksServices = new webhooksServices({
  token: process.env.LAYER_BEARER_TOKEN,
  appId: process.env.LAYER_APP_ID
});

// LayerClient is something that we'll use to post messages, and manipulate Conversations
// based on webhook events
var LayerClient = require('layer-api');
var layerClient = new LayerClient({
  token: process.env.LAYER_BEARER_TOKEN,
  appId: process.env.LAYER_APP_ID
});

/**
 * Example shows quick and simple setup of a webhooks service.
 * This example shows a single inline service that logs new messages.
 */
function startInlineServices() {
  // Provide a webhook definition
  var hook = {
    name: 'Inline Sample',
    events: ['message.sent'],
    path: '/',
  };

  // Listen for events from Layer's Services, and call our callbackAsync with each event
  webhooksServices.listen({
    expressApp: app,
    secret: SECRET,
    hooks: [hook]
  });

}

http.createServer(app).listen(PORT, function() {
   console.log('Express server listening on port ' + PORT);
   startInlineServices();
});
