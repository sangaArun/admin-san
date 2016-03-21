(function () {
  'use strict';

  angular
    .module('csvupload')
    .controller('CsvuploadController', CsvuploadController);

  CsvuploadController.$inject = ['$scope', '$state'];

  function CsvuploadController($scope, $state) {
    var vm = this;
    vm.submit = submit;


    // Save Article
    function submit() {
    //      alert(vm.file.name);
    }
   /*    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('articles.list'));
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  */
  }
}());
