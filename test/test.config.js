/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */

var config = require('bedrock').config;
var path = require('path');
require('bedrock-permission');

var permissions = config.permission.permissions;
var roles = config.permission.roles;

config.mocha.tests.push(path.join(__dirname, 'mocha'));

// MongoDB
config.mongodb.name = 'bedrock_agreement_http_test';
config.mongodb.host = 'localhost';
config.mongodb.port = 27017;
config.mongodb.local.collection = 'bedrock_agreement_http_test';
config.mongodb.username = 'bedrock';
config.mongodb.password = 'password';
config.mongodb.adminPrompt = true;
config.mongodb.dropCollections.onInit = true;
config.mongodb.dropCollections.collections = [];

roles['bedrock-agreement-http.test'] = {
  id: 'bedrock-agreement-http.test',
  label: 'Agreement HTTP Test Role',
  comment: 'Role for Test User',
  sysPermission: [
    permissions.AGREEMENT_ACCESS.id,
    permissions.AGREEMENT_ACCEPT.id
  ]
};
