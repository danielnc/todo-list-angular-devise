angular.module('todo-list.directives').directive('dateTime', function(){
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel){
      if (!ngModel) {
        console.log('no model, returning');
        return;
      }

      element.bind('blur keyup change', function() {
        console.log('datetime changed: ', $('.form_datetime input').val());
        scope.$apply(read);
      });

      read();

      function read() {
        ngModel.$setViewValue(element.val());
      }
    }
  }
});