var app = angular.module('app', []);

//This controller manages anything to do with managing a users friends list
app.controller('angFriendController', function($scope, $http) {

  $scope.acceptFriendRequest = function(frndEmail) {
    $http({
      method  : 'POST',
      url     : '/acceptFrndReq',
      data    : $.param({'frndEmail' : frndEmail}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.getFriends();
        $scope.getFriendReqs();
    });
  }

  $scope.rejectFriendRequest = function(frndEmail) {
    $http({
      method  : 'POST',
      url     : '/rejectFrndReq',
      data    : $.param({'frndEmail' : frndEmail}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.getFriendReqs();
    });
  }

  $scope.sendFriendRequest = function() {
    $http({
      method  : 'POST',
      url     : '/sendFrndReq',
      data    : $.param({'reqEmail' : $scope.reqEmail}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.friendReqFlash = data;
    });
  }

  $scope.removeFriend = function(frndEmail) {
    $http({
      method  : 'POST',
      url     : '/removeFrnd',
      data    : $.param({'frndEmail' : frndEmail}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.getFriends();
    });
  }

  $scope.getFriendReqs = function(){
    $http({
      method : 'GET',
      url    : '/getFriendReqs',
    })
    .success(function(data, status, headers, config){
      $scope.friendRequests = data;
    });
  }

  $scope.getFriends = function(){
    $http({
      method : 'GET',
      url    : '/getFriends',
    })
    .success(function(data, status, headers, config){
      $scope.friends = data;
    });
  }

  $scope.init = function(){
    $scope.getFriendReqs();
    $scope.getFriends();
  }

  $scope.init();

});
