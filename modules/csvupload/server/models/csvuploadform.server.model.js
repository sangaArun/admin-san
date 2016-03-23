'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var deviceListSchema = new Schema({
  ip: {
    type: String,
    default: ''
  },
  snmp_version: {
    type: Number,
    default: 0
  },
  snmpv3_user: {
    type: String,
    default: '',
    trim: true
  },
  snmpv3_auth: {
    type: String,
    default: '',
    trim: true
  },
  snmpv3_auth_key: {
    type: String,
    default: '',
    trim: true
  },
  snmpv3_privacy: {
    type: String,
    default: '',
    trim: true
  },
  snmpv3_privacy_key: {
    type: String,
    default: '',
    trim: true
  },
  company: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('DeviceList', deviceListSchema);
