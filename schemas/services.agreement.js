/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var constants = require('bedrock').config.constants;
var schemas = require('bedrock-validation').schemas;

var postAgreement = {
  type: 'object',
  properties: {
    agreement: {
      type: ['string', 'array'],
      required: true
    }
  }
};

module.exports.postAgreement = function() {
  return postAgreement;
};
