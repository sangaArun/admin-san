'use strict';

/**
 * Module dependencies
 */

var deviceCtrl = require('../controllers/device.server.controller');

module.exports = function (app) {

  app.route('/search/devices/globalSearch')
  .post(deviceCtrl.filterDevicesForGlobalSearch);

  app.route('/search/devices/dateSearch')
    .post(deviceCtrl.filterDevicesForDate);

};
