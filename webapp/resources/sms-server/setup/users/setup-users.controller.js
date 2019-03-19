(function () {
  'use strict';

  angular
  .module('sms-server')
  .controller('setupUsersCtrl', setupUsersCtrl);

  /** @ngInject */
  function setupUsersCtrl(setupUsersService, $scope, $uibModal,
      confirmService) {
    var getUsers = function () {
      setupUsersService.getUsers().then(function (data) {
        $scope.users = data.data;
      });
    };

    getUsers();

    $scope.addUserModal = function () {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'modal/add-user/add-user.tmpl.html',
        controller: 'addUserCtrl',
        size: 'lg'
      }).closed.then(function () {
        getUsers();
      });
    };

    $scope.changePasswordModal = function () {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'modal/change-password/change-password.tmpl.html',
        controller: 'changePasswordCtrl',
        size: 'lg'
      });
    };

    var confirmDeleteModalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete User?',
      bodyText: 'Are you sure you want to delete this user?'
    };

    $scope.removeUser = function (id) {
      confirmService.showModal({}, confirmDeleteModalOptions).then(
          function (result) {
            setupUsersService.removeUser(id).then(function (data) {
              getUsers();
            })
          });
    };
  }
})();