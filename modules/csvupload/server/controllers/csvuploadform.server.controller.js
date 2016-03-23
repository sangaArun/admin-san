'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  csv = require("fast-csv"),
  fs = require("fs"),
  multer = require('multer'),
  DeviceList = mongoose.model('DeviceList'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */


exports.uploadCsv = function (req, res) {
console.log('hi');
var upload = multer(config.uploads.profileUpload).single('file');
//var upload = multer.single('device-list1')
  upload(req, res, function (err) {
    if (err) {
         console.log(err);  // An error occurred when uploading
      return;
    }
    var file = req.file;
    console.log(req.file.filename);
    var stream = fs.createReadStream(req.file.path);
    csv.fromStream(stream, { headers: ['ip', 'snmp_version', 'snmpv2_community', 'snmpv3_user', 'snmpv3_auth', 'snmpv3_auth_key', 'snmpv3_privacy', 'snmpv3_privacy_key'] })
      .on('data', function(data) {
        var devices = new DeviceList(data);
        devices.set('company', req.user.company);
        // console.log(devices, '***********');
        devices.save(function (err, data) {
          if (err) {
         console.log(err);
          } else {
           console.log('saved *****', data);
          }
        });
      })
       .on('end', function() {
         console.log('done  sanga');
       });
       fs.unlink(req.file.path)
  });
  res.json({error_code:0,err_desc:null});

  };



