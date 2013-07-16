Simple Rails application using Devise and Angular.js...


API usage example:

* curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d ' {"user":{"email":"foo@bar.com","password":"123456"}}'  http://todo-list-angular-devise.dev/api/auth_token
* curl -v -H "Accept: application/json" -H "Content-type: application/json" http://todo-list-angular-devise.dev/api/todos?auth_token=ysxA4SBJ8pThma7kcFpy
