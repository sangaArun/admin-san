(function () {
  'use strict';

  angular
    .module('csvupload')
    .controller('CsvuploadController', CsvuploadController);

  CsvuploadController.$inject = ['$scope', '$state','Upload','CsvuploadService','ngTableParams','$filter'];

  function CsvuploadController($scope, $state, Upload,CsvUploadService,ngTableParams,$filter) {
    var vm = this;
    vm.submit = submit;
    vm.upload = upload;
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
            _id: 'asc'     // initial sorting
        }
    }, {
        total: vm.deviceList.length,           // length of data
        getData: function($defer, params) {
        var orderedData = params.sorting() ? $filter('orderBy')(vm.deviceList, params.orderBy()) : data;
        orderedData	= $filter('filter')(orderedData, params.filter());
        params.total(orderedData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                     }
    });

    // Save Article
    function submit() {
        vm.upload(vm.file);
    }

    function upload(file) {
      Upload.upload({
        url: 'http://localhost:3000/upload/deviceList', //webAPI exposed to upload the file
        data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
              alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
              vm.deviceList = resp.data.respDeviceList;
              console.log('after file upload');
              console.log(resp.data.respDeviceList);
              $scope.tableParams.reload();
            } else {
              alert('an error occured');
            }
        }, function (resp) { //catch error
          console.log('Error status: ' + resp.status);
          alert('Error status: ' + resp.status);
        })
    }
  }
}());
