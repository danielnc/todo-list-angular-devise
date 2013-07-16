angular.module('todo-list.resources').factory('Todo', ['$resource', 'apiNamespace', function($resource, apiNamespace) {
  return $resource(apiNamespace + "/todos/:id", {
    id: "@id"
  }, {
    update: {
      method: "PUT"
    }
  });
}]);
