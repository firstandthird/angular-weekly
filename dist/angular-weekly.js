/*!
 * angular-weekly - Weekly Calendar Angular directive
 * v0.0.3
 * https://github.com/jgallen23/angular-weekly/
 * copyright Greg Allen 2013
 * MIT License
*/
(function() {
  var app = angular.module('weekly', []);

  app.directive('weekly', function($parse) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function(scope, el, args, model) {
        var addEventFn = $parse(args.weeklyAdd);
        var removeEventFn = $parse(args.weeklyRemove);
        el
          .addClass('weekly')
          .weekly()
          .on('addEvent', function(e, evnt) {
            //update model value
            addEventFn(scope, { event: evnt });
          })
          .on('removeEvent', function(e, evnt) {
            removeEventFn(scope, { event: evnt });
          });

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
