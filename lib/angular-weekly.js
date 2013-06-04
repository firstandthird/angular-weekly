(function() {
  var app = angular.module('weekly', []);

  app.directive('weekly', function() {
    return {
      restrict: 'EA',
      link: function(scope, el) {
        el.addClass('weekly').weekly();
      }
    };
  });
})();
