(function () {
  'use strict';

  angular
  .module('sms-server')
  .controller('loginCtrl', loginCtrl);

  /** @ngInject */
  function loginCtrl($scope, $location, ngProgressFactory, md5, loginService,
      toaster) {
    var progress = ngProgressFactory.createInstance();
    progress.setColor('#00e6e6');
    $scope.login = function (user) {
      progress.start();
      user.password = md5.createHash(user.password);

      loginService.logIn(user).then(
          function (response) {
            loginService.setAuthentication();
            $location.path('/statistics');
            progress.complete();
          }, function (reason) {
            progress.complete();
            toaster.pop({
              type: 'error',
              title: 'Error',
              body: reason.data.message,
              timeout: 0
            })
          }
      );
    }
  }
})();