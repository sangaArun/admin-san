(function (app) {
  'use strict';

  app.registerModule('csvupload', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('csvupload', ['ngFileUpload','ngTable']);
  app.registerModule('csvupload.services');
  app.registerModule('csvupload.routes', ['ui.router', 'csvupload.services']);
}(ApplicationConfiguration));
