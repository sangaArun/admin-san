(function() {
    'use strict';

    angular
        .module('devices.services')
        .factory('SearchDeviceService', SearchDeviceService);

    SearchDeviceService.$inject = ['$resource'];

    function SearchDeviceService($resource) {

        return {
        globalSearch : $resource('/search/devices/globalSearch/:searchTerm'),
        dateSearch : $resource('/search/devices/dateSearch/:searchTerm')
        }

    }

    /*angular.module('devices.services').factory('Device', Device);

    Device.$inject = ['$resource'];

    function Device($resource) {

        return $resource('/api/devices/');

    }*/
}());
