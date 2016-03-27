'use strict'
var _ = require('lodash');
var rp = require('request-promise');
var querystring = require('querystring');
var ENDPOINT = 'http://skylanders.wikia.com/api/v1/Articles/AsSimpleJson'
var SEARCH = 'http://skylanders.wikia.com/api/v1/Search/List'

function SkylandersHelper() { }

SkylandersHelper.prototype.requestSkylanderInfo = function(skylander_name) {
    return this.getSkylanderData(skylander_name).then(
    function(response) {
      console.log('success - received info for skylander ' + skylander_name);
//      console.dir(response.sections[0];
      return response.sections[0];
     }
   );
};

SkylandersHelper.prototype.getSkylanderData = function(skylander_name) {

  var options = {
    method: 'GET',
    qs: {
        query : skylander_name,
        limit : '1',
        minArticleQuality : '90',
        batch : '1',
        namespaces : "0,14"
    },
    uri: SEARCH + "?",
    json: true
  };

  var rp_complete = rp(options).then(function (response) {
    var skylanderID = response.items[0].id;
    var options = {
                  method: 'GET',
                  uri: ENDPOINT + "?id=" + skylanderID,
                  json: true
                  };
    return rp(options);
  });
 console.dir(rp_complete);
  
  return rp_complete;
};

SkylandersHelper.prototype.formatSkylanderInfo = function(skylanderInfo) {
//    console.log("Inside format...");
//    console.dir(skylanderInfo);
    return _.template('${abstract}')({
    abstract: skylanderInfo.content[0].text
  });
//    console.log("Test at format");
//    console.dir(skylanderInfo);
//    var info = JSON.parse(skylanderInfo);
//    return info.text;
//    return _.template('There is currently no delay at ${airport}. ${weather}')({
//         airport: skylanderInfo.level,
//         weather: "weather"
//});
};

module.exports = SkylandersHelper;
