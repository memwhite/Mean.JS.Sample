(function () {
  'use strict';

  // Descriptions controller
  angular
    .module('descriptions')
    .controller('DescriptionsController', DescriptionsController);

  DescriptionsController.$inject = ['$scope', '$state', 'Authentication', 'descriptionResolve'];

  function DescriptionsController ($scope, $state, Authentication, description) {
    var vm = this;

    vm.authentication = Authentication;
    vm.description = description;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Description
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.description.$remove($state.go('descriptions.list'));
      }
    }

    // Save Description
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.descriptionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.description._id) {
        vm.description.$update(successCallback, errorCallback);
      } else {
        vm.description.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('descriptions.view', {
          descriptionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
