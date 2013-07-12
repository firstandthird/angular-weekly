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
          var clickEventFn = $parse(args.weeklyClick);
          var options = $parse(args.weekly)();
          var isUpdating = false;
          el
            .addClass('weekly')
            .on('weekChange', function(e, data) {
              weekChangeEventFn(scope, { data: data });
            })
            .on('addEvent', function(e, evnt) {
              if (!isUpdating) {
                scope.$apply(function() {
                  evnt = (evnt instanceof Array) ? evnt : [evnt];
                  for (var i = 0, c = evnt.length; i < c; i++) {
                    var item = evnt[i];
                    scope[args.ngModel].push(item);
                  }
                  addEventFn(scope, { event: evnt });
                });
              }
            })
            .on('removeEvent', function(e, evnt) {
              if (!isUpdating) {
                var index = evnt._index;
                scope.$apply(function() {
                  scope[args.ngModel].splice(index, 1);
                  removeEventFn(scope, { event: evnt });
                });
              }
            })
            .on('eventClick', function(e, evnt, el) {
              scope.$apply(function() {
                clickEventFn(scope, { event: scope[args.ngModel][evnt._index], el: el });
              });
            })
            .weekly(options);

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
