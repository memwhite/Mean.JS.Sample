//Descriptions service used to communicate Descriptions REST endpoints
(function () {
  'use strict';

  angular
    .module('descriptions')
    .factory('DescriptionsService', DescriptionsService);

  DescriptionsService.$inject = ['$resource'];

  function DescriptionsService($resource) {
    return $resource('api/descriptions/:descriptionId', {
      descriptionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
