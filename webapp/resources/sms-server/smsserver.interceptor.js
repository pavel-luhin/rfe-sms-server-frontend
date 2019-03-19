(function () {
  'use strict';

  angular
  .module('sms-server')
  .factory('httpInterceptor', httpInterceptor);

  /** @ngInject */
  function httpInterceptor($q, $location, $cookies, $rootScope, toaster,
      localStorageAuthName) {
    return {
      requestError: requestError,
      responseError: responseError
    };

    function requestError(rejection) {
      if (canRecover(rejection)) {
        return responseOrNewPromise;
      }
      return $q.reject(rejection);
    }

    function responseError(rejection) {
      if (rejection.status === 401) {
        if (localStorage.getItem(localStorageAuthName)) {
          toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'Your session have been expired',
            timeout: 0
          })
        }
        $rootScope.authenticated = false;
        localStorage.removeItem(localStorageAuthName);
        $location.path('/login');
      } else {
        var body = rejection.data;
        var messageObject = JSON.parse(body);
        toaster.pop({
          type: 'error',
          title: 'Error',
          body: messageObject.message,
          timeout: 0
        });
      }

      return $q.reject(rejection);
    }
  }
})();