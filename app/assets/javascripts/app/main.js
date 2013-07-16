angular.module('todo-list.controllers', []);
angular.module('todo-list.directives', [])
angular.module('todo-list.resources', ['ngResource']);
angular.module('todo-list.services', []);

this.app = angular.module("app", [
  "ngResource",
  "ui.compat",
  "ngGrid",
  "ngCookies",
  "$strap.directives",
  "todo-list.services",
  "todo-list.directives",
  "todo-list.resources",
  "todo-list.controllers"
  ], function ($routeProvider, $locationProvider, $httpProvider) {
  var interceptor = ['$rootScope', '$q', function (scope, $q) {
      function success(response) {
          return response;
      }

      function error(response) {
          var status = response.status;

          if (status == 401) {
              window.location = "/login";
              return;
          }
          return $q.reject(response);

      }

      return function (promise) {
          return promise.then(success, error);
      }

  }];
  $httpProvider.responseInterceptors.push(interceptor);
});