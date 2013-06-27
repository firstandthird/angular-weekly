/*!
 * angular-weekly - Weekly Calendar Angular directive
 * v0.0.6
 * https://github.com/jgallen23/angular-weekly/
 * copyright Greg Allen 2013
 * MIT License
*/
(function() {
  angular.module('weekly', [])
    .directive('weekly', ['$parse', function($parse) {
      return {
        restrict: 'EA',
        require: 'ngModel',
        link: function(scope, el, args, model) {
          var addEventFn = $parse(args.weeklyAdd);
          var removeEventFn = $parse(args.weeklyRemove);
          var weekChangeEventFn = $parse(args.weeklyChange);
          var isUpdating = false;
          el
            .addClass('weekly')
            .on('weekChange', function(e, data) {
              weekChangeEventFn(scope, { data: data });
            })
            .on('addEvent', function(e, evnt) {
              if (!isUpdating) {
                scope.$apply(function() {
                  scope[args.ngModel].push(evnt);
                });
                addEventFn(scope, { event: evnt });
              }
            })
            .on('removeEvent', function(e, evnt) {
              if (!isUpdating) {
                var index = evnt._index;
                scope.$apply(function() {
                  scope[args.ngModel].splice(index, 1);
                });
                removeEventFn(scope, { event: evnt });
              }
            })
            .weekly();

          if (args.ngModel) {
            scope.$watch(args.ngModel, function(val) {
              isUpdating = true;
              el
                .weekly('clearEvents')
                .weekly('addEvent', val);
              isUpdating = false;
            }, true);
          }
        }
      };
  }]);
})();
