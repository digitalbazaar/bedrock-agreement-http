/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
 /* globals describe, before, after, it, should, beforeEach, afterEach */
 /* jshint node: true */
'use strict';

var async = require('async');
var bedrock = require('bedrock');
var brAgreement = require('bedrock-agreement');
var config = bedrock.config;
var database = require('bedrock-mongodb');
var helpers = require('./helpers');
var mockData = require('./mock.data');
var request = require('request');
request = request.defaults({json: true, strictSSL: false});
var url = require('url');
var uuid = require('uuid').v4;

var urlObj = {
  protocol: 'https',
  host: config.server.host,
  pathname: config['bedrock-agreement-http'].routes.accepted
};

describe('add HTTP API', function() {
  before(function(done) {
    helpers.prepareDatabase(mockData, done);
  });

  beforeEach(function(done) {
    helpers.removeCollection('eventLog', done);
  });

  it('returns PermissionDenied if not authenticated', function(done) {
    request.post(url.format(urlObj), function(err, res, body) {
      res.statusCode.should.equal(400);
      should.exist(body);
      body.should.be.an('object');
      should.exist(body.type);
      body.type.should.equal('PermissionDenied');
      done();
    });
  });

  it('adds an event for one agreement specified as a string', function(done) {
    var agreements = uuid();
    var actor = mockData.identities.regularUser;
    async.auto({
      insert: function(callback) {
        request.post(helpers.createHttpSignatureRequest({
          url: url.format(urlObj),
          body: {agreement: agreements},
          identity: actor
        }), function(err, res, body) {
          callback(err, body);
        });
      },
      test: ['insert', function(callback, results) {
        database.collections.eventLog.find({
          'event.id': results.insert.id
        }).toArray(function(err, result) {
          should.not.exist(err);
          should.exist(result);
          result.should.be.an('array');
          result.should.have.length(1);
          should.exist(result[0].event);
          var event = result[0].event;
          event.should.be.an('object');
          should.exist(event.type);
          event.type.should.equal('AgreementAccept');
          should.exist(event.date);
          event.date.should.be.a('string');
          should.exist(event.resource);
          event.resource.should.be.an('array');
          event.resource.should.have.length(1);
          event.resource[0].should.equal(agreements);
          should.exist(event.actor);
          event.actor.should.equal(actor.identity.id);
          should.exist(event.id);
          event.id.should.be.a('string');
          callback();
        });
      }]
    }, done);
  });
  it('adds an event for four agreements specified as an array', function(done) {
    var agreements = [];
    for(var i = 0; i < 4; i++) {
      agreements.push(uuid());
    }
    var actor = mockData.identities.regularUser;
    async.auto({
      insert: function(callback) {
        request.post(helpers.createHttpSignatureRequest({
          url: url.format(urlObj),
          body: {agreement: agreements},
          identity: actor
        }), function(err, res, body) {
          callback(err, body);
        });
      },
      test: ['insert', function(callback, results) {
        database.collections.eventLog.find({
          'event.id': results.insert.id
        }).toArray(function(err, result) {
          should.not.exist(err);
          var event = result[0].event;
          should.exist(event.resource);
          event.resource.should.be.an('array');
          event.resource.should.have.length(4);
          event.resource.should.deep.equal(agreements);
          callback();
        });
      }]
    }, done);
  });
  it('returns an error if agreement is not a string or array', function(done) {
    var agreements = {bad: 'data'};
    var actor = mockData.identities.regularUser;
    request.post(helpers.createHttpSignatureRequest({
      url: url.format(urlObj),
      body: {agreement: agreements},
      identity: actor
    }), function(err, res, body) {
      res.statusCode.should.equal(400);
      body.should.be.an('object');
      body.type.should.equal('ValidationError');
      done();
    });
  });
  it('returns an error if agreement is not provided', function(done) {
    var actor = mockData.identities.regularUser;
    request.post(helpers.createHttpSignatureRequest({
      url: url.format(urlObj),
      body: {},
      identity: actor
    }), function(err, res, body) {
      res.statusCode.should.equal(400);
      body.should.be.an('object');
      body.type.should.equal('ValidationError');
      done();
    });
  });
}); // end add

describe('get HTTP API', function() {
  before(function(done) {
    helpers.prepareDatabase(mockData, done);
  });

  beforeEach(function(done) {
    helpers.removeCollection('eventLog', done);
  });

  it('returns PermissionDenied if not authenticated', function(done) {
    request.get(url.format(urlObj), function(err, res, body) {
      res.statusCode.should.equal(400);
      should.exist(body);
      body.should.be.an('object');
      should.exist(body.type);
      body.type.should.equal('PermissionDenied');
      done();
    });
  });
  it('returns one agreement', function(done) {
    var agreements = uuid();
    var actor = mockData.identities.regularUser;

    async.auto({
      insert: function(callback) {
        brAgreement.accept(actor.identity, agreements, callback);
      },
      get: ['insert', function(callback) {
        request.get(
          helpers.createHttpSignatureRequest({
            url: url.format(urlObj),
            identity: actor
          }),
          function(err, res, body) {
            callback(err, body);
          });
      }],
      test: ['get', function(callback, results) {
        var result = results.get;
        result.should.be.an('array');
        result.should.have.length(1);
        result.should.include(agreements);
        callback();
      }]
    }, done);
  });
  it('returns four agreements', function(done) {
    var agreements = [];
    for(var i = 0; i < 4; i++) {
      agreements.push(uuid());
    }
    var actor = mockData.identities.regularUser;
    async.auto({
      insert: function(callback) {
        brAgreement.accept(actor.identity, agreements, callback);
      },
      get: ['insert', function(callback) {
        request.get(
          helpers.createHttpSignatureRequest({
            url: url.format(urlObj),
            identity: actor
          }),
          function(err, res, body) {
            callback(err, body);
          });
      }],
      test: ['get', function(callback, results) {
        var result = results.get;
        result.should.be.an('array');
        result.should.have.length(4);
        result.should.deep.equal(agreements);
        callback();
      }]
    }, done);
  });
  it('returns one agreement where id is specified via query', function(done) {
    var agreements = uuid();
    var actor = mockData.identities.regularUser;

    async.auto({
      insert: function(callback) {
        brAgreement.accept(actor.identity, agreements, callback);
      },
      get: ['insert', function(callback) {
        var clonedUrlObj = bedrock.util.clone(urlObj);
        clonedUrlObj.query = {
          id: actor.identity.id
        };
        request.get(
          helpers.createHttpSignatureRequest({
            url: url.format(clonedUrlObj),
            identity: actor
          }),
          function(err, res, body) {
            callback(err, body);
          });
      }],
      test: ['get', function(callback, results) {
        var result = results.get;
        result.should.be.an('array');
        result.should.have.length(1);
        result.should.include(agreements);
        callback();
      }]
    }, done);
  });
  it('allows administrator to query agreements');
}); // end get
