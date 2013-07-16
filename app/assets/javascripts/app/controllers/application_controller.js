angular.module('todo-list.controllers').controller("ApplicationController", ['$scope', 'Session', function($scope, Session) {
  $scope.session_resource = Session
}]);
