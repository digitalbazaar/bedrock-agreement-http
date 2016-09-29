/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
/* globals describe, before, after, it, should, beforeEach, afterEach */
/* jshint node: true */
'use strict';

var async = require('async');
var bedrock = require('bedrock');
var brAgreement = require('bedrock-agreement');
var brIdentity = require('bedrock-identity');
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

describe('bedrock-agreement-http API', function() {
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

    describe('authenticated as regularUser', () => {
      var actor = mockData.identities.regularUser;

      it('adds event for one agreement specified as a string', function(done) {
        var agreements = uuid();
        async.auto({
          insert: function(callback) {
            request.post(helpers.createHttpSignatureRequest({
              url: url.format(urlObj),
              body: {agreement: agreements},
              identity: actor
            }), function(err, res) {
              callback(err, res);
            });
          },
          test: ['insert', function(callback, results) {
            results.insert.statusCode.should.equal(201);
            database.collections.eventLog.find({
              'event.id': results.insert.body.id
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

      it('adds event for 4 agreements specified as an array', function(done) {
        var agreements = [];
        for(var i = 0; i < 4; i++) {
          agreements.push(uuid());
        }
        async.auto({
          insert: function(callback) {
            request.post(helpers.createHttpSignatureRequest({
              url: url.format(urlObj),
              body: {agreement: agreements},
              identity: actor
            }), function(err, res) {
              callback(err, res);
            });
          },
          test: ['insert', function(callback, results) {
            results.insert.statusCode.should.equal(201);
            database.collections.eventLog.find({
              'event.id': results.insert.body.id
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

      it('returns error if agreement is not a string or array', function(done) {
        var agreements = {bad: 'data'};
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

    }); // end authenticated as regularUser

    describe('authenticated as AdminUser', () => {
      var actor = mockData.identities.adminUser;

      it('adds event for one agreement specified as a string', function(done) {
        var agreements = uuid();
        async.auto({
          insert: function(callback) {
            request.post(helpers.createHttpSignatureRequest({
              url: url.format(urlObj),
              body: {agreement: agreements},
              identity: actor
            }), (err, res) => {
              callback(err, res);
            });
          },
          test: ['insert', function(callback, results) {
            // console.log('results: ', JSON.stringify(results, null, 2));
            results.insert.statusCode.should.equal(201);
            database.collections.eventLog.find({
              'event.id': results.insert.body.id
            }).toArray(function(err, result) {
              should.not.exist(err);
              var event = result[0].event;
              should.exist(event.resource);
              event.resource.should.be.an('array');
              event.resource.should.have.length(1);
              event.resource[0].should.equal(agreements);
              callback();
            });
          }]
        }, done);
      });

      it('returns an error if agreement is not provided', function(done) {
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

    }); // end authenticated as AdminUser
  }); // end add HTTP API

  describe('get HTTP API', function() {
    before(function(done) {
      helpers.prepareDatabase(mockData, done);
    });

    beforeEach(function(done) {
      helpers.removeCollection('eventLog', done);
    });

    // no authentication
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

    describe('authenticated as regularUser', () => {
      var mockIdentity = mockData.identities.regularUser;
      var actor;

      before(done => {
        brIdentity.get(
          null, mockIdentity.identity.id, (err, result) => {
            actor = result;
            done(err);
          });
      });

      it('returns one agreement', function(done) {
        var agreements = uuid();

        async.auto({
          insert: function(callback) {
            brAgreement.accept(actor, agreements, callback);
          },
          get: ['insert', function(callback) {
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(urlObj),
                identity: mockIdentity
              }),
              function(err, res) {
                callback(err, res);
              });
          }],
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
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
        async.auto({
          insert: function(callback) {
            brAgreement.accept(actor, agreements, callback);
          },
          get: ['insert', function(callback) {
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(urlObj),
                identity: mockIdentity
              }),
              function(err, res) {
                callback(err, res);
              });
          }],
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.be.an('array');
            result.should.have.length(4);
            result.should.deep.equal(agreements);
            callback();
          }]
        }, done);
      });

      // User A queries themselves (User A queries User A)
      it('returns one agreement for id specified via query by user', done => {
        var agreements = uuid();
        async.auto({
          insert: function(callback) {
            brAgreement.accept(actor, agreements, callback);
          },
          get: ['insert', function(callback) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: actor.id
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockIdentity
              }),
              function(err, res) {
                callback(err, res);
              });
          }],
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.be.an('array');
            result.should.have.length(1);
            result.should.include(agreements);
            callback();
          }]
        }, done);
      });

      // User A queries User B (without authorization)
      it('returns error for id via query by unauthorized user', done => {
        var mockIdentityB = mockData.identities.regularUserB;
        var agreements = uuid();
        var agreementsB = uuid();

        async.auto({
          getIdentityB: function(callback) {
            brIdentity.get(null, mockIdentityB.identity.id, (err, results) => {
              callback(err, results);
            });
          },
          insertA: function(callback) {
            brAgreement.accept(actor, agreements, callback);
          },
          insertB: ['getIdentityB', function(callback, results) {
            brAgreement.accept(results.getIdentityB, agreementsB, callback);
          }],
          get: ['insertA', 'insertB', function(callback, results) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: results.getIdentityB.id
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockIdentity
              }),
              function(err, res, body) {
                callback(err, body);
              });
          }],
          test: ['get', function(callback, results) {
            var result = results.get;
            should.exist(result);
            result.should.be.an('object');
            should.exist(result.type);
            result.type.should.equal('PermissionDenied');
            should.exist(result.details);
            result.details.httpStatusCode.should.equal(403);
            callback();
          }]
        }, done);
      });

      // User A queries an invalid user
      it('returns error for invalid id queried by unauthorized user', done => {
        var nonExistentUserID = 'did:' + uuid();
        var agreements = uuid();

        async.auto({
          insertA: function(callback) {
            brAgreement.accept(actor, agreements, callback);
          },
          get: ['insertA', function(callback) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: nonExistentUserID
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockIdentity
              }),
              function(err, res, body) {
                callback(err, body);
              });
          }],
          test: ['get', function(callback, results) {
            var result = results.get;
            should.exist(result);
            result.should.be.an('object');
            should.exist(result.type);
            result.type.should.equal('PermissionDenied');
            should.exist(result.details);
            result.details.httpStatusCode.should.equal(403);
            callback();
          }]
        }, done);
      });

    }); // end authenticated as regularUser

    describe('authenticated as adminUser', () => {
      var mockAdminID = mockData.identities.adminUser;

      it('returns one agreement', done => {
        var agreements = uuid();

        async.auto({
          getID: function(callback) {
            brIdentity.get(null, mockAdminID.identity.id, (err, results) => {
              callback(err, results);
            });
          },
          insert: ['getID', function(callback, results) {
            brAgreement.accept(results.getID, agreements, callback);
          }],
          get: ['insert', function(callback) {
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(urlObj),
                identity: mockAdminID
              }),
              function(err, res) {
                callback(err, res);
              });
          }],
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.be.an('array');
            result.should.have.length(1);
            result.should.include(agreements);
            callback();
          }]
        }, done);
      });

      // Admin User queries authenticated User A
      it('returns one agreement for another id specified via query', done => {
        var mockIdentity = mockData.identities.regularUser;
        var agreements = uuid();

        async.auto({
          getID: function(callback) {
            brIdentity.get(null, mockIdentity.identity.id, (err, results) => {
              callback(err, results);
            });
          },
          insert: ['getID', function(callback, results) {
            brAgreement.accept(results.getID, agreements, callback);
          }],
          get: ['insert', function(callback, results) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: results.getID.id
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockAdminID
              }),
              function(err, res) {
                callback(err, res);
              });
          }],
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.be.an('array');
            result.should.have.length(1);
            result.should.include(agreements);
            callback();
          }]
        }, done);
      });

      // Admin User queries non-authenticated User A
      it('returns no agreements for id specified via query', done => {
        var mockIdentity = mockData.identities.regularUser;

        async.auto({
          get: function(callback) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: mockIdentity.identity.id
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockAdminID
              }),
              function(err, res) {
                callback(err, res);
              });
          },
          test: ['get', function(callback, results) {
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.have.length(0);
            callback();
          }]
        }, done);
      });

      // Admin User queries non-existent user
      it('returns error for incorrect id specified via query', done => {
        var nonExistentUserID = 'did:' + uuid();

        async.auto({
          get: function(callback) {
            var clonedUrlObj = bedrock.util.clone(urlObj);
            clonedUrlObj.query = {
              id: nonExistentUserID
            };
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(clonedUrlObj),
                identity: mockAdminID
              }),
              function(err, res) {
                callback(err, res);
              });
          },
          test: ['get', function(callback, results) {
            // NOTE: No validation is being done on id at this time,
            // therefore, an id not in the system will return an empty body.
            // This test needs to be updated when the API is updated to
            // validate the id.
            results.get.statusCode.should.equal(200);
            var result = results.get.body;
            result.should.have.length(0);
            callback();
          }]
        }, done);
      });

    }); // end authenticated as adminUser

    describe('authenticated as noPermission user', () => {
      var mockIdentity = mockData.identities.noPermission;

      it('returns PermissionDenied error', done => {
        async.auto({
          get: function(callback) {
            request.get(
              helpers.createHttpSignatureRequest({
                url: url.format(urlObj),
                identity: mockIdentity
              }),
              function(err, res, body) {
                callback(err, body);
              });
          },
          test: ['get', function(callback, results) {
            var result = results.get;
            should.exist(result);
            result.should.be.an('object');
            should.exist(result.type);
            result.type.should.equal('PermissionDenied');
            should.exist(result.details);
            result.details.httpStatusCode.should.equal(403);
            callback();
          }]
        }, done);
      });

    }); // end authenticated as noPermission
  }); // end get
});
