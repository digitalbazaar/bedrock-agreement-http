/*
 * Bedrock Agreement HTTP Module.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
/* jshint node: true */
var bedrock = require('bedrock');
var brAgreement = require('bedrock-agreement');
var brRest = require('bedrock-rest');
var brPassport = require('bedrock-passport');
var config = bedrock.config;
var validate = require('bedrock-validation').validate;

var BedrockError = bedrock.util.BedrockError;
var ensureAuthenticated = brPassport.ensureAuthenticated;

// load config defaults
require('./config');

bedrock.events.on('bedrock.test.configure', function() {
  require('./test.config');
});

// add routes
bedrock.events.on('bedrock-express.configure.routes', addRoutes);

function addRoutes(app) {
  var acceptedPath = config['bedrock-agreement-http'].routes.accepted;

  // get agreements for the authenticated identity
  app.get(
    acceptedPath, ensureAuthenticated, brRest.when.prefers.ld,
    brRest.makeResourceHandler({
      get: function(req, res, callback) {
        var actor = req.user ? req.user.identity : undefined;
        var identityId = req.query.id || actor.id;
        brAgreement.getAccepted(actor, identityId, callback);
      }
    }));

  // create a new agreement for the authenticated identity
  app.post(
    acceptedPath, ensureAuthenticated,
    validate('services.agreement.postAgreement'), function(req, res, next) {
      var actor = req.user ? req.user.identity : undefined;
      brAgreement.accept(actor, req.body.agreement, function(err, result) {
        if(err) {
          return next(new BedrockError(
            'The agreement could not be accepted.',
            'AcceptAgreementFailed', {
              httpStatusCode: 400,
              'public': true
            }, err));
        }
        res.status(201).json(result.event);
      });
    });
}

// add agrements to the session data
bedrock.events.on(
  'bedrock-session-http.session.get', function(req, session, callback) {
    if(req.isAuthenticated() && req.user.identity) {
      session.identity = session.identity || {};
      return brAgreement.getAccepted(
        req.user.identity, req.user.identity.id, function(err, agreements) {
          if(err) {
            return callback(err);
          }
          session.identity.agreements = agreements;
          callback();
        });
    }
    callback();
  });
