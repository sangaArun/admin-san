(function() {
  angular.module("csvupload").directive("deviceTrackedTableRow", deviceTrackedTableRow);

  deviceTrackedTableRow.$inject = [];

  function deviceTrackedTableRow() {
    return {
      restrict: "A",
      priority: -1,
      require: ["^deviceTrackedTable", "ngForm"],
      controller: deviceTrackedTableRowController
    };
  }

  deviceTrackedTableRowController.$inject = ["$attrs", "$element", "$parse", "$scope"];

  function deviceTrackedTableRowController($attrs, $element, $parse, $scope) {
    var self = this;
    var row = $parse($attrs.deviceTrackedTableRow)($scope);
    var rowFormCtrl = $element.controller("form");
    var trackedTableCtrl = $element.controller("deviceTrackedTable");

    self.isCellDirty = isCellDirty;
    self.setCellDirty = setCellDirty;
    self.setCellInvalid = setCellInvalid;

    function isCellDirty(cell) {
      return trackedTableCtrl.isCellDirty(row, cell);
    }

    function setCellDirty(cell, isDirty) {
      trackedTableCtrl.setCellDirty(row, cell, isDirty)
    }

    function setCellInvalid(cell, isInvalid) {
      trackedTableCtrl.setCellInvalid(row, cell, isInvalid)
    }
  }
})();
