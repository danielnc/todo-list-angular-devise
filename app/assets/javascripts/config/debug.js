app.run(function($rootScope, $state, $stateParams) {
  $rootScope.$debugMode = "on"; // Turn off in production
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
