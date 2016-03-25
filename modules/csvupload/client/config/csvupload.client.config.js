(function () {
  'use strict';

  angular
    .module('csvupload')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Manage Devices',
      state: 'loadCsvForm.loadForm',
      // type: 'dropdown',
      roles: ['user']
    });

    /* // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'List Articles',
      state: 'articles.list'
    }); */

  }
}());
