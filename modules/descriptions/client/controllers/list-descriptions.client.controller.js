(function () {
  'use strict';

  angular
    .module('descriptions')
    .controller('DescriptionsListController', DescriptionsListController);

  DescriptionsListController.$inject = ['DescriptionsService'];

  function DescriptionsListController(DescriptionsService) {
    var vm = this;

    vm.descriptions = DescriptionsService.query();
  }
})();
