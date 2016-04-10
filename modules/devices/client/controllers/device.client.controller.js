(function() {
    'use strict';

    angular
        .module('devices')
        .controller('SearchDeviceController', SearchDeviceController);

    SearchDeviceController.$inject = ['$scope', '$state', 'SearchDeviceService', 'ngTableParams', '$filter', '$window','$stateParams'];

    function SearchDeviceController($scope, $state, SearchDeviceService, ngTableParams, $filter, $window,$stateParams) {
        var vm = this;
        //vm.searchBar = searchBar;
        vm.open1 = open1;
        vm.open2 = open2;
        $scope.tableParams = {};
        vm.devices = [];
        vm.filter = filter;
        vm.popup1 = {};
        vm.popup1.opened = false;
        vm.popup2 = {};
        vm.searchTerm = $stateParams.term;
        vm.popup2.opened = false;
        vm.altInputFormats = ['M!/d!/yyyy'];
        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            startingDay: 1
          };
          vm.setDate = setDate;

        var searchObject = {};
        searchObject.searchTerm = vm.searchTerm;
        SearchDeviceService.globalSearch.save({search:searchObject},function(data) {
            vm.devices = data.list;
            $scope.tableParams.reload();
        });

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                snmp_version: 'asc' // initial sorting
            }
        }, {
            total: vm.devices.length, // length of data
            getData: function($defer, params) {
                var orderedData = vm.devices;
                orderedData = params.sorting() ? $filter('orderBy')(vm.devices, params.orderBy()) : data;
                orderedData = $filter('filter')(orderedData, vm.search);
                if(orderedData){
                    params.total(orderedData.length);
                }
                if (params.total() < (params.page() - 1) * params.count()) {
                                    params.page(1);
                }
                //params.total(orderedData.length);
                if(orderedData){
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }

            }
        });

        $scope.$watch("vm.search", function() {
            $scope.tableParams.reload();
        });


        function filter(){
            console.log(vm.search);
            var searchObj = {};
            //searchObj.filterText = vm.search;
            searchObj.startDate = vm.startDate;
            searchObj.endDate = vm.endDate;
            SearchDeviceService.dateSearch.save({search:searchObj},function(data) {
                        vm.devices = data.list;
                        $scope.tableParams.reload();
                    });
            /*SearchDeviceService.save(searchObj,function(data){
                console.log(data);
                vm.devices = data.list;
                $scope.tableParams.reload();
            });*/
        }


         function  open1(){
            vm.popup1.opened = true;
          };

         function  open2(){
            vm.popup2.opened = true;
        };

          function disabled(data) {
              var date = data.date,
                mode = data.mode;
              return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

             function setDate(year, month, day) {
                vm.date = new Date(year, month, day);
              };


    }
}());
