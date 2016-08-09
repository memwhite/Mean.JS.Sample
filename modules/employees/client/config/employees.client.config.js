(function () {
  'use strict';

  angular
    .module('employees')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Employees',
      state: 'employees',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'employees', {
      title: 'List Employees',
      state: 'employees.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'employees', {
      title: 'Create Employee',
      state: 'employees.create',
      roles: ['user']
    });
  }
})();
