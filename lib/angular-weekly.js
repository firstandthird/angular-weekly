(function() {
  var app = angular.module('weekly', []);

  app.directive('weekly', function($parse) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function(scope, el, args, model) {
        var addEventFn = $parse(args.weeklyAdd);
        var removeEventFn = $parse(args.weeklyRemove);
        var weekChangeEventFn = $parse(args.weeklyChange);
        el
          .addClass('weekly')
          .on('weekChange', function(e, data) {
            weekChangeEventFn(scope, { data: data });
          })
          .on('addEvent', function(e, evnt) {
            //update model value
            addEventFn(scope, { event: evnt });
          })
          .on('removeEvent', function(e, evnt) {
            removeEventFn(scope, { event: evnt });
          })
          .weekly();

        if (args.ngModel) {
          scope.$watch(args.ngModel, function(val) {
            el
              .weekly('clearEvents')
              .weekly('addEvent', val);
          }, true);
        }
      }
    };
  });
})();
