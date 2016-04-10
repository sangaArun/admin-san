'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    config = require(path.resolve('./config/config')),
    SearchModule = require(path.resolve('./config/lib/elasticSearch')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var SearchClient = SearchModule.ElasticClient;
var DeviceIndex = SearchModule.deviceIndex;
var DeviceType = SearchModule.deviceType;
/**
 * Create an article
 */
exports.searchAllDevices = function(req, res) {
    var jResp = [];
    SearchClient.search({
        index: DeviceIndex,
        type: DeviceType,
        body: {
            query: {
                "match_all": {}
            }
        }
    }).then(function(resp) {
        for (var v in resp.hits.hits) {
            jResp.push(resp.hits.hits[v]._source);
        }
        res.json(jResp);
    }, function(err) {
        console.log(err.message);
    });

};

exports.filterDevicesForDate = function(req, res) {
    var searchObj = req.body;
    var jResp = [];
    SearchClient.search({
        index: DeviceIndex,
        type: DeviceType,
        body: {
            query: {
                filtered: {
                    filter: {
                        bool: {
                            should: {
                                range: {
                                    "lastSeen": {
                                        "gte" : searchObj.startDate,
                                        "lte" : searchObj.endDate
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }).then(function(resp) {
        for (var v in resp.hits.hits) {
            jResp.push(resp.hits.hits[v]._source);
        }
        console.log(jResp);
        var obj = {};
        obj.list = jResp
        res.json(obj);
    }, function(err) {
        console.log(err.message);
    });
};

exports.filterDevicesForGlobalSearch = function(req, res) {
    var searchObj = req.body;
    console.log("before body");
    console.log(searchObj);
    var searchStr = "";
    var str = "*"
    searchStr = str + searchObj.search.searchTerm + str;
    var jResp = [];
    console.log(searchStr);
    SearchClient.search({
        index: DeviceIndex,
        type: DeviceType,
        body: {
            query: {
                query_string: {
                                        query: searchStr,
                                        fields: ["description","ipAddress","serialNo","softwareVersion","model","lastSeen", "securityIssue"]
                }
            }
        }
    }).then(function(resp) {
        console.log(resp);
        for (var v in resp.hits.hits) {
            jResp.push(resp.hits.hits[v]._source);
        }
        console.log(jResp);
        var obj = {};
        obj.list = jResp
        res.json(obj);
    }, function(err) {
        console.log(err.message);
    });
};
