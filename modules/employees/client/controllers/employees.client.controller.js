(function () {
  'use strict';

  // Employees controller
  angular
    .module('employees')
    .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', 'Authentication', 'employeeResolve', 'ProductsService', '$resource'];

  function EmployeesController ($scope, $state, Authentication, employee, ProductsService, $resource) {
    var vm = this;

    vm.authentication = Authentication;
    vm.employee = employee;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.products = ProductsService.query();
    
    // Remove existing Employee
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.employee.$remove($state.go('employees.list'));
      }
    }

    // Save Employee
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employees.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
