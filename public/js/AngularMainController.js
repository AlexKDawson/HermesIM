//TODO RENAME CONTROLLER AND ADD MORE
app.controller('AngularMainController', function($scope, $http) {

  $scope.init = function(frndReqs, frnds, userName, profPic){
    $scope.frndReqs = frndReqs.split(',');
    $scope.frnds = frnds.split(',');
    $scope.userName = userName;
    $scope.profPic = profPic;
  }

  $scope.acceptFriendRequest = function(frndEmail) {
    $http({
      method  : 'POST',
      url     : '/acceptFrndReq',
      data    : $.param({'frndEmail' : frndEmail}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      console.log(JSON.stringify(data));
      $scope.frnds.push(data.user.friends[data.user.friends.length - 1]);
      var index = $scope.frndReqs.indexOf(data.friend);
      $scope.frndReqs.splice(index, 1);
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
      var index = $scope.frndReqs.indexOf(data.friend);
      $scope.frndReqs.splice(index, 1);
    });
  }
});
