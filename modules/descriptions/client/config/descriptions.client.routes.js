(function () {
  'use strict';

  angular
    .module('descriptions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('descriptions', {
        abstract: true,
        url: '/descriptions',
        template: '<ui-view/>'
      })
      .state('descriptions.list', {
        url: '',
        templateUrl: 'modules/descriptions/client/views/list-descriptions.client.view.html',
        controller: 'DescriptionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Descriptions List'
        }
      })
      .state('descriptions.create', {
        url: '/create',
        templateUrl: 'modules/descriptions/client/views/form-description.client.view.html',
        controller: 'DescriptionsController',
        controllerAs: 'vm',
        resolve: {
          descriptionResolve: newDescription
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Descriptions Create'
        }
      })
      .state('descriptions.edit', {
        url: '/:descriptionId/edit',
        templateUrl: 'modules/descriptions/client/views/form-description.client.view.html',
        controller: 'DescriptionsController',
        controllerAs: 'vm',
        resolve: {
          descriptionResolve: getDescription
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Description {{ descriptionResolve.name }}'
        }
      })
      .state('descriptions.view', {
        url: '/:descriptionId',
        templateUrl: 'modules/descriptions/client/views/view-description.client.view.html',
        controller: 'DescriptionsController',
        controllerAs: 'vm',
        resolve: {
          descriptionResolve: getDescription
        },
        data:{
          pageTitle: 'Description {{ articleResolve.name }}'
        }
      });
  }

  getDescription.$inject = ['$stateParams', 'DescriptionsService'];

  function getDescription($stateParams, DescriptionsService) {
    return DescriptionsService.get({
      descriptionId: $stateParams.descriptionId
    }).$promise;
  }

  newDescription.$inject = ['DescriptionsService'];

  function newDescription(DescriptionsService) {
    return new DescriptionsService();
  }
})();
