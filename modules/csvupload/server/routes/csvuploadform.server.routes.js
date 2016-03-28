'use strict';

/**
 * Module dependencies
 */
/*var articlesPolicy = require('../policies/articles.server.policy'),*/
  var deviceListCtrl = require('../controllers/csvuploadform.server.controller');

module.exports = function (app) {

  app.route('/upload/deviceList').post(deviceListCtrl.uploadCsv);

  app.route('/fetch/deviceList').get(deviceListCtrl.fetchDeviceList);

  app.route('/api/devices/')
  .post(deviceListCtrl.saveDevice)
  .delete(deviceListCtrl.removeDevice);

};

/*module.exports = function (app) {
  app.route('/fetch/deviceList').get(deviceListCtrl.fetchDeviceList)
};*/
