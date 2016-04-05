'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  chalk = require('chalk'),
  path = require('path'),
  elasticsearch = require('elasticsearch');


  //
  var elasticClient = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'info'
  });

  var deviceIndex = "netsec";
  var deviceType = "device";
  exports.deviceIndex = deviceIndex;
  exports.deviceType = deviceType;
  exports.ElasticClient = elasticClient;

//
