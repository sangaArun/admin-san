(function () {
  'use strict';

  angular
    .module('devices')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Search Devices',
      state: 'search.devices',
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
