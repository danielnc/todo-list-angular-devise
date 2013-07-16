angular.module('todo-list.controllers').controller('SessionsController', ['$scope', '$location', '$cookieStore', 'Session', function($scope, $location, $cookieStore, Session) {

  $scope.session = Session.userSession;

  $scope.create = function() {

    if ( Session.signedOut ) {
      $scope.session.$save().success(function(data, status, headers, config) {
        $cookieStore.put('_angular_devise_user', Session.userSession.email);
        $location.path('/todos');
      });
    }
  };

  $scope.destroy = function() {
    $cookieStore.remove('_angular_devise_user');
    $scope.session.$destroy();
  };

}]);