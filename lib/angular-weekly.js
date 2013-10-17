(function() {
  angular.module('weekly', [])
    .directive('weekly', ['$parse', function($parse) {
      return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
          model: '=ngModel',
          options: '&weekly',
          weekChangeEventFn: '&weeklyChange',
          addEventFn: '&weeklyAdd',
          removeEventFn: '&weeklyRemove',
          clickEventFn: '&weeklyClick',
          timezone: '=weeklyTimezone',
<<<<<<< HEAD
=======
          splitInterval: '=weeklySplitInterval',
          readOnly: '=weeklyReadonly'
>>>>>>> 152837d16754d60d828af91ab102ea9cc4a61757
        },
        link: function(scope, el, args) {
          var isUpdating = false;
          var options = scope.options();
          el
            .addClass('weekly')
            .on('weekChange', function(e, data) {
              scope.weekChangeEventFn({ data: data });
            })
            .on('addEvent', function(e, evnt) {
              if (!isUpdating) {
                scope.$apply(function() {
                  evnt = (evnt instanceof Array) ? evnt : [evnt];
                  for (var i = 0, c = evnt.length; i < c; i++) {
                    var item = evnt[i];
                    scope.model.push(item);
                  }
                  scope.addEventFn({ event: evnt });
                });
              }
            })
            .on('removeEvent', function(e, evnt) {
              if (!isUpdating) {
                var index = evnt._index;
                scope.$apply(function() {
                  scope.model.splice(index, 1);
                  scope.removeEventFn({ event: evnt });
                });
              }
            })
            .on('eventClick', function(e, evnt, el) {
              scope.$apply(function() {
                scope.clickEventFn({ event: scope.model[evnt._index], el: el });
              });
            })
            .weekly(options);

          if (args.ngModel) {
            scope.$watch('model', function(val) {
              isUpdating = true;
              el
                .weekly('clearEvents')
                .weekly('addEvent', val);
              isUpdating = false;
            }, true);
          }

          if (args.weeklyTimezone) {
            scope.$watch('timezone', function(val) {
              if (val) {
                el.weekly('setTimezoneOffset', val);
              }
            });
          }

<<<<<<< HEAD
=======
          if (args.weeklySplitInterval) {
            scope.$watch('splitInterval', function(val) {
              if (val) {
                el.weekly('setSplitInterval', val);
              }
            });
          }

          if (args.weeklyReadonly) {
            scope.$watch('readOnly', function(val) {
              if (typeof val !== 'undefined') {
                el.weekly('setReadOnly', val);
              }
            });
          }
>>>>>>> 152837d16754d60d828af91ab102ea9cc4a61757
        }
      };
  }]);
})();
