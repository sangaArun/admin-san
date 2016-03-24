(function () {
  'use strict';

  angular
    .module('csvupload.services')
    .factory('CsvuploadService', CsvuploadService);

  CsvuploadService.$inject = ['$resource'];

  function CsvuploadService($resource) {

     return $resource('/fetch/deviceList');

  }
}());
