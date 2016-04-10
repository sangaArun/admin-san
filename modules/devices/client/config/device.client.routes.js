(function () {
  'use strict';

  angular
    .module('devices.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('search', {
        abstract: true,
        url: '/search/:term',
        template: '<ui-view/>'
      })
      .state('search.devices', {
        url: '',
        templateUrl: 'modules/devices/client/views/device.client.view.html',
        controller: 'SearchDeviceController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Search Devices'
        }
      });
  }


  /* getCsvForm.$inject = ['$stateParams', 'CsvuploadService'];

  function getCsvForm($stateParams, CsvuploadService) {
    return CsvuploadService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newCsvForm.$inject = ['CsvuploadService'];

  function newCsvForm(CsvuploadService) {
    return new CsvuploadService();
  } */

}());
