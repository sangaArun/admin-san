(function () {
  'use strict';

  angular
    .module('csvupload.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('loadCsvForm', {
        abstract: true,
        url: '/loadCsvForm',
        template: '<ui-view/>'
      })
      .state('loadCsvForm.loadForm', {
        url: '',
        templateUrl: 'modules/csvupload/client/views/csvuploadform.client.view.html',
        controller: 'CsvuploadController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Csv Upload'
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
