'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var skyHelper = require('../skylanders_data_helper');
chai.config.includeStack = true;

describe('skyHelper',function() {
  var subject = new skyHelper();
  var skylander_name;
  describe ('#getSkylanderData', function() {
    context('with a valid skylander name', function() {
      it('returns matching skylander name', function() {
        skylander_name = 'Chopper';
        var value = subject.requestSkylanderInfo(skylander_name).then(function(obj) {
          return obj.title;
        });
        return expect(value).to.eventually.eq(skylander_name);
      });
    });
    context('with an invalid skylander name', function() {
      it('returns an error', function() {
        skylander_name = 'AABBCCDD';
        return expect(subject.requestSkylanderInfo(skylander_name)).to.be.rejectedWith(Error);
      });
    });
  });

  describe('#formatSkylanderInfo', function() {
    var info = {
    'sections': {
        'content': {
            'text': "Chopper is a T-Rex\u00a0who is one of the new core Tech Skylanders in Skylanders: Trap Team.", 
            'type': "paragraph"
          }, 
        'images': {}, 
        'level': 1, 
        'title': 'Chopper'
     }
    };
    context('with a title of chopper', function() {
      it('formats the abstract as expected', function() {
        info.sections[0].title = 'Chopper';
        expect(subject.formatSkylanderInfo(info)).to.eq('Chopper is a T-Rex\u00a0who is one of the new core Tech Skylanders in Skylanders: Trap Team.');
      });
    });
  });
});
