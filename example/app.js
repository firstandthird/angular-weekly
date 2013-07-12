angular.module('example-app', ['weekly']);

var MainController = function($scope) {

  var today = new Date();
  var event1 = {
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12),
    id: '123'
  }
  var event2 = {
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15),
    id: '456'
  }
  var event3 = {
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17),
    id: '456'
  }

  $scope.events = [event1, event2];

  $scope.addEvent = function(evnt) {
    console.log('event added', evnt);
  }

  $scope.removeEvent = function(evnt) {
    console.log('event removed', evnt);
  }

  $scope.addAnotherEvent = function() {
    $scope.events.push(event3);
  }

  $scope.eventClick = function(evnt, el) {
    evnt.title = 'Clicked';
    evnt.type = 'clicked';
    console.log('click', evnt, el);
  };

  $scope.weekChanged = function(data) {
    console.log('week changed', data);
  }

  $scope.$watch('events', function() {
    console.log('events changed', arguments);
  }, true);


};
