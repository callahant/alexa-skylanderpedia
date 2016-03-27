'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('skylanderpedia');
var SkylandersHelper = require('./skylanders_data_helper');

app.launch(function(req, res) {
  var prompt = 'For Skylanders information, tell me a skylander name.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('skylanderpedia', {
  'slots': {
     'SKYLANDER': 'SKYLANDERS'
  },
  'utterances': ['{|skylander} {|info|stuff|status} {|for|about|on} {-|SKYLANDER}']
 },
  function(req, res) {
    var skylanderName = req.slot('SKYLANDER');
    var reprompt = 'Tell me a skylander name to get more information.';
    if (_.isEmpty(skylanderName)) {
      var prompt = 'I didn\'t head a skylander name. Tell me a skylander name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var skylanderHelper = new SkylandersHelper();
      skylanderHelper.requestSkylanderInfo(skylanderName).then(function(skylanderInfo) {
        console.log("Inside else");
        console.dir(skylanderInfo);
        console.log("Leaving else");
        console.dir(res.say(skylanderHelper.formatSkylanderInfo(skylanderInfo)).send());
      }).catch(function(err) {
//        console.log(err.statusCode);
//        console.dir(err);
        var prompt = 'I did\'t have any data for a skylander named ' + skylanderName;
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
     }
    }
);

app.intent('cancel', function (req,resp) {
    response.say("Goodbye");
    logout( req.userId);
  }
);

//hack to support custom utterances in utterance expansion string
//console.log(app.utterances().replace(/\{\-\|/g, '{'));

module.exports = app;
//exports.handler = app.lambda();
