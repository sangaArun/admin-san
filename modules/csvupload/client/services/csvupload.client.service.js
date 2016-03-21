(function () {
  'use strict';

  angular
    .module('csvupload.services')
    .factory('CsvuploadService', CsvuploadService);

  CsvuploadService.$inject = ['$resource'];

  function CsvuploadService($resource) {

    /* return $resource('api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }); */

  }
}());
