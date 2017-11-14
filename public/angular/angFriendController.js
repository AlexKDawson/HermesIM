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

app.controller('angUserController', function($scope, $http) {

  $scope.getUserName = function(){
    $http({
      method  : 'GET',
      url     : '/getUserName'
    })
    .success(function(data, status, headers, config){
      $scope.username = data;
    });
  }

  $scope.init = function(){
    $scope.getUserName();
  }

  $scope.init();
});

app.controller('angGroupController', function($scope, $http) {

  $scope.getGroups = function(){
    $http({
      method  : 'GET',
      url     : '/getGroups',
    })
    .success(function(data, status, headers, config){
      $scope.groups = data;
      $scope.getCurrentGroup();
    });
  }

  $scope.init = function(){
    $scope.getGroups();
  }

  $scope.getCurrentGroup = function(){
    for( var g of $scope.groups){
      if(g.groupID === $scope.currentGroupID){
        $scope.currentGroup = g;
        $scope.messageDraft = "";
        return;
      }
    }
  }

  $scope.createNewGroup = function(){
    $http({
      method  : 'POST',
      url     : '/createGroup',
      data    : $.param({'newGroupName' : $scope.newGroupName}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.getGroups();
    });

  }

  $scope.sendMessage = function(){
    $http({
      method  : 'POST',
      url     : '/sendMessage',
      data    : $.param({'groupID' : $scope.currentGroup.groupID, 'message' : $scope.messageDraft}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.getGroups();
    });
  }

  $scope.init();
});
