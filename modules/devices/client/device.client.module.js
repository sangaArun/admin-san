(function (app) {
  'use strict';

  app.registerModule('devices', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('devices', ['ngTable']);
  app.registerModule('devices.services');
  app.registerModule('devices.routes', ['ui.router', 'devices.services']);
}(ApplicationConfiguration));
