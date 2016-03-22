'use strict';

/**
 * Module dependencies
 */
/*var articlesPolicy = require('../policies/articles.server.policy'),*/
  var deviceListCtrl = require('../controllers/csvuploadform.server.controller');

module.exports = function (app) {
  app.route('/upload/deviceList').post(deviceListCtrl.uploadCsv)
};
