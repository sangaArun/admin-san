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


exports.uploadCsv = function(req, res) {
    var upload = multer(config.uploads.profileUpload).single('file');
    //var upload = multer.single('device-list1')
    var deviceList = [];
    upload(req, res, function(err) {
        if (err) {
            console.log(err); // An error occurred when uploading
            return;
        }
        var file = req.file;
        var stream = fs.createReadStream(req.file.path);
        csv.fromStream(stream, {
                headers: ['ip', 'snmp_version', 'snmpv2_community', 'snmpv3_user', 'snmpv3_auth', 'snmpv3_auth_key', 'snmpv3_privacy', 'snmpv3_privacy_key']
            })
            .on('data', function(data) {
                var devices = new DeviceList(data);
                var now = new Date();
                devices.set('company', req.user.company);
                var created_by = req.user.firstName + " " + req.user.lastName;
                devices.set('created_by', created_by);
                devices.set('created_date', now);
                // console.log(devices, '***********');
                devices.save(function(err, data) {
                    if (err) {
                        //console.log(err);
                    } else {
                        //console.log('saved *****', data);
                    }
                });
            })
            .on('end', function() {
                console.log('done  sanga');
                DeviceList.find({
                    company: req.user.company
                }).exec(function(err, devices) {
                    if (err) {
                        console.log(err);
                    } else {
                        deviceList = devices;
                        console.log("query after upload");
                        console.log(deviceList);
                        console.log("query after fetch");
                        fs.unlink(req.file.path);
                        res.json({
                            error_code: 0,
                            err_desc: null,
                            respDeviceList: deviceList
                        });
                    }
                });
            });
        console.log('before querying all devicelist');
    });
};

exports.fetchDeviceList = function(req, res) {
    DeviceList.find({
        company: req.user.company
    }).exec(function(err, devices) {
        if (err) {
            console.log(err);
            console.log('error');
        } else {
            res.json(devices)
        }
    });
};


exports.saveDevice = function(req, res) {
    var query = {
        'id': req.body._id
    };
    var dev = req.body;
    var device = new DeviceList(req.body);
    var now = new Date();
    device.set('company', req.user.company);
    var created_by = req.user.firstName + " " + req.user.lastName;
    device.set('created_by', created_by);
    device.set('created_date', now);
    if (dev._id) {
        var updatedVal = {
            ip: dev.ip,
            snmp_version: dev.snmp_version,
            snmpv3_user: dev.snmpv3_user,
            snmpv3_auth: dev.snmpv3_auth,
            snmpv3_auth_key: dev.snmpv3_auth_key,
            snmpv3_privacy: dev.snmpv3_privacy,
            snmpv3_privacy_key: dev.snmpv3_privacy_key,
            company: dev.company,
            created_by: dev.created_by,
            created_date: dev.created_date
        };
        device.update({
            "_id": {
                $eq: dev._id
            }
        }, {
            $set: updatedVal
        }, function(err, result) {
            if (err) {
                console.log("Updated successfully");
            }
            console.log("Updated successfully");
            console.log(result);
            DeviceList.find({
                _id: dev._id
            }).exec(function(err, device) {
                return res.json(device);
            });

        });

    } else {
        device.save(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved *****', data);
                return res.json(device);
            }
        });
    }
    /*var upsertData = device.toObject();
      delete upsertData._id;
      DeviceList.update({_id: device.id}, upsertData, {upsert: true}, function(err,device){
      if(err){
          console.log(err);
      }
      console.log(device);

      });*/

};


exports.removeDevice = function(req, res) {
    var id = req.body.id;
    DeviceList.remove({
        '_id': id
    }, function(result) {
        console.log('record deleted succeffully')
        return res.json({
            "message": "record deleted successfully"
        });
    });

};
