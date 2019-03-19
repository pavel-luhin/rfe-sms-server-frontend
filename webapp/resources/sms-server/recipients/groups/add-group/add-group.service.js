(function () {
  'use strict';

  angular
  .module('sms-server')
  .factory('addGroupService', addGroupService);

  /** @ngInject */
  function addGroupService(RestURLFactory, $http) {
    return {
      getAllPersons: getAllPersons,
      getGroup: getGroup,
      getPersonsWithoutGroup: getPersonsWithoutGroup,
      saveGroup: saveGroup
    };

    function getAllPersons() {
      return $http.get(RestURLFactory.ALL_PERSONS);
    }

    function getGroup(id) {
      return $http.get(RestURLFactory.GROUP + '/' + id);
    }

    function getPersonsWithoutGroup(groupId) {
      return $http.get(RestURLFactory.PERSONS_WITHOUT_GROUP + groupId);
    }

    function saveGroup(group) {
      return $http.post(RestURLFactory.GROUP, group);
    }
  }
})();