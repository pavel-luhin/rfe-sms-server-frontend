(function () {
  'use strict';

  angular
  .module('sms-server')
  .controller('setupApplicationsCtrl', setupApplicationsCtrl);

  /** @ngInject */
  function setupApplicationsCtrl(setupApplicationsService, $scope, $uibModal,
      confirmService) {
    var getAllApplications = function () {
      setupApplicationsService.getApplications().then(function (data) {
        $scope.applications = data.data;
      });
    };

    getAllApplications();

    $scope.addApplicationModal = function () {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'modal/add-application/add-application.tmpl.html',
        controller: 'addApplicationCtrl',
        size: 'lg'
      }).closed.then(function () {
        getAllApplications();
      });
    };

    var confirmDeleteModalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Application?',
      bodyText: 'Are you sure you want to delete this application?'
    };

    $scope.removeApplication = function (id) {
      confirmService.showModal({}, confirmDeleteModalOptions).then(
          function (result) {
            setupApplicationsService.removeApplication(id).then(
                function (data) {
                  getAllApplications();
                })
          });
    };
  }
})();