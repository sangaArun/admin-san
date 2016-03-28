(function() {
    'use strict';

    angular
        .module('csvupload')
        .controller('CsvuploadController', CsvuploadController);

    CsvuploadController.$inject = ['$scope', '$state', 'Upload', 'CsvuploadService','Device', 'ngTableParams', '$filter', '$window'];

    function CsvuploadController($scope, $state, Upload, CsvUploadService,Device, ngTableParams, $filter, $window) {
        var vm = this;
        vm.submit = submit;
        vm.upload = upload;
        vm.removeFile = removeFile;
        $scope.tableParams = {};
        vm.deviceList = [];
        vm.cancel = cancel;
        vm.del = del;
        vm.save = save;
        vm.add = add;
        vm.cancelChanges = cancelChanges;
        vm.saveChanges = saveChanges;
        var originalData = [];

        CsvUploadService.query(function(data) {
            vm.deviceList = data;
            originalData = angular.copy(vm.deviceList);
            $scope.tableParams.reload();
        });

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                snmp_version: 'asc' // initial sorting
            }
        }, {
            total: vm.deviceList.length, // length of data
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')(vm.deviceList, params.orderBy()) : data;
                orderedData = $filter('filter')(orderedData, vm.search);
                params.total(orderedData.length);
                if (params.total() < (params.page() - 1) * params.count()) {
                    params.page(1);
                }
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.$watch("vm.search", function() {
            $scope.tableParams.reload();
        });

        function cancel(device, rowForm) {
            var originalRow = resetRow(device, rowForm);
            angular.extend(device, originalRow);
        }

        function del(device) {
                Device.delete(device,function(){
                    _.remove(vm.deviceList, function(item) {
                                    return device === item;
                                });
                                $scope.tableParams.reload().then(function(data) {
                                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                                        $scope.tableParams.page($scope.tableParams.page() - 1);
                                        $scope.tableParams.reload();
                                    }
                                });
                            });

                }

        function resetRow(device, deviceForm) {
            device.isEditing = false;
            deviceForm.$setPristine();
            vm.tableTracker.untrack(device);
            return _.find(originalData, function(r) {
                return r._id === device._id;
            });
        }

        function save(device, deviceForm) {
                    Device.save(device,function(dev){
                    device.isEditing=false;
                    vm.isEditing=false;
                    device._ip=dev.i_ip;
                    device.created_date=dev.created_date;
                    device.modified_date=dev.modified_date;
                    device.modified_by=dev.modified_by;
                    device.created_by = dev.created_by;
                    var originalRow = resetRow(device, deviceForm);
                    if(typeof originalRow!= 'undefined'){
                        angular.extend(originalRow, device);
                    }else{
                        originalRow = device;
                    }
                    console.log(device);
                     $scope.tableParams.reload();
                    });
                }

        function add() {
            vm.isEditing = true;
            vm.isAdding = true;
            vm.deviceList.unshift({
                ip: "",
                snmp_version: null,
                snmpv3_user: "",
                snmpv3_auth: "",
                snmpv3_auth_key: "",
                snmpv3_privacy: "",
                snmpv3_privacy_key: "",
                isEditing: true
            });
            // we need to ensure the user sees the new row we've just added.
            // it seems a poor but reliable choice to remove sorting and move them to the first page
            // where we know that our new item was added to
            $scope.tableParams.sorting({});
            $scope.tableParams.page(1);
            $scope.tableParams.reload();
        }

        function cancelChanges() {
            resetTableStatus();

            var currentPage = $scope.tableParams.page();
            vm.deviceList = angular.copy(originalData);
            /*$scope.tableParams.settings({
                dataset: angular.copy(originalData)
            });*/
            // keep the user on the current page when we can
            if (!vm.isAdding) {
                $scope.tableParams.page(currentPage);
            }
            $scope.tableParams.reload();
        }

        function resetTableStatus() {
            vm.isEditing = false;
            vm.isAdding = false;
            vm.tableTracker.reset();
            vm.tableForm.$setPristine();
        }

        function saveChanges() {
            resetTableStatus();
            var currentPage = $scope.tableParams.page();
            originalData = angular.copy(vm.deviceList);
        }

        // Save Article
        function submit() {
            vm.upload(vm.file);
        }

        function removeFile() {
            vm.file = null;
        }

        function upload(file) {
            Upload.upload({
                url: 'http://localhost:3000/upload/deviceList', //webAPI exposed to upload the file
                data: {
                    file: file
                } //pass file as data, should be user ng-model
            }).then(function(resp) { //upload function returns a promise
                if (resp.data.error_code === 0) { //validate success
                    //$window.alert(resp.config.data.file.name + 'Uploaded Successfully.');
                    vm.deviceList = resp.data.respDeviceList;
                    originalData = vm.deviceList;
                    $scope.tableParams.reload();
                    vm.file = null;
                } else {
                    //$window.alert('Upload Failed');
                }
            }, function(resp) { //catch error
                //$window.alert('Upload Failed');
            })
        }
    }
}());
