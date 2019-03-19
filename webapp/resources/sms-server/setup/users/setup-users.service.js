(function () {
  'use strict';

  angular
  .module('sms-server')
  .factory('setupUsersService', setupUsersService);

  /** @ngInject */
  function setupUsersService($http, RestURLFactory) {
    return {
      getUsers: getUsers,
      removeUser: removeUser
    };

    function getUsers() {
      return $http.get(RestURLFactory.USERS);
    }

    function removeUser(id) {
      return $http.delete(RestURLFactory.USERS + '/' + id);
    }
  }
})();