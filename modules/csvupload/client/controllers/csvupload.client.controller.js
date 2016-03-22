(function () {
  'use strict';

  angular
    .module('csvupload')
    .controller('CsvuploadController', CsvuploadController);

  CsvuploadController.$inject = ['$scope', '$state','Upload'];

  function CsvuploadController($scope, $state, Upload) {
    var vm = this;
    vm.submit = submit;
    vm.upload = upload;


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
