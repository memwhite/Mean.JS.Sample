(function () {
  'use strict';

  angular
    .module('descriptions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Descriptions',
      state: 'descriptions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'descriptions', {
      title: 'List Descriptions',
      state: 'descriptions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'descriptions', {
      title: 'Create Description',
      state: 'descriptions.create',
      roles: ['user']
    });
  }
})();
