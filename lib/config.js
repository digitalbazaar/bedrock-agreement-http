/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */

var config = require('bedrock').config;
var path = require('path');

var basePath = '/agreements';
config['bedrock-agreement-http'] = {};
config['bedrock-agreement-http'].routes = {};
config['bedrock-agreement-http'].routes.basePath = basePath;
config['bedrock-agreement-http'].routes.accepted = basePath + '/accepted';

// common validation schemas
config.validation.schema.paths.push(
  path.join(__dirname, '..', 'schemas')
);
