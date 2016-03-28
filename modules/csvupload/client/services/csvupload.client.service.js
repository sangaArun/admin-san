(function() {
    'use strict';

    angular
        .module('csvupload.services')
        .factory('CsvuploadService', CsvuploadService);

    CsvuploadService.$inject = ['$resource'];

    function CsvuploadService($resource) {

        return $resource('/fetch/deviceList');

    }

    angular.module('csvupload.services').factory('Device', Device);

    Device.$inject = ['$resource'];

    function Device($resource) {

        return $resource('/api/devices/');

    }
}());
