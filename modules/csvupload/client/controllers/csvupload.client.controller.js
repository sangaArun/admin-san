(function () {
  'use strict';

  angular
    .module('csvupload')
    .controller('CsvuploadController', CsvuploadController);

  CsvuploadController.$inject = ['$scope', '$state','Upload','CsvuploadService','ngTableParams','$filter','$window'];

  function CsvuploadController($scope, $state, Upload,CsvUploadService,ngTableParams,$filter,$window) {
    var vm = this;
    vm.submit = submit;
    vm.upload = upload;
    vm.removeFile =removeFile;
    $scope.tableParams = {};
    vm.deviceList = [];

    CsvUploadService.query(function(data){
    vm.deviceList = data;
    $scope.tableParams.reload();
    });


    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            snmp_version: 'asc'     // initial sorting
        }
    }, {
        total: vm.deviceList.length,           // length of data
        getData: function($defer, params) {
        var orderedData = params.sorting() ? $filter('orderBy')(vm.deviceList, params.orderBy()) : data;
        console.log(vm.search);
        orderedData	= $filter('filter')(orderedData, vm.search);
        params.total(orderedData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                     }
    });

    $scope.$watch("vm.search", function () {
        $scope.tableParams.reload();
    });

    // Save Article
    function submit() {
        vm.upload(vm.file);
    }

    function removeFile() {
            vm.file =null;
        }

    function upload(file) {
      Upload.upload({
        url: 'http://localhost:3000/upload/deviceList', //webAPI exposed to upload the file
        data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
              //$window.alert(resp.config.data.file.name + 'Uploaded Successfully.');
              vm.deviceList = resp.data.respDeviceList;
              $scope.tableParams.reload();
              vm.file = null;
            } else {
              //$window.alert('Upload Failed');
            }
        }, function (resp) { //catch error
          //$window.alert('Upload Failed');
        })
    }
  }
}());
