/*!
 * angular-weekly - Weekly Calendar Angular directive
 * v0.0.1
 * https://github.com/jgallen23/angular-weekly/
 * copyright Greg Allen 2013
 * MIT License
*/
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
