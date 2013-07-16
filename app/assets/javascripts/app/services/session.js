angular.module('todo-list.services').service('Session',[ '$cookieStore', 'UserSession', 'UserRegistration', function($cookieStore, UserSession, UserRegistration) {

  this.currentUser = function() {
    return $cookieStore.get('_angular_devise_user');
  }
  this.signedIn = function() {
    return !!this.currentUser();
  }
  this.signedOut = function() {
    return !this.signedIn();
  }
  this.userSession = new UserSession( { email:"sample@email.com", password:"password", remember_me:true } );
  this.userRegistration = new UserRegistration( { email:"sample@email.com", password:"password", password_confirmation:"password" } );
}]);