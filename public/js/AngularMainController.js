
// app.controller('addFriendController', function($scope, $http) {
//   $scope.formData = {"userEmail": "<%=user.email%>"};
//
//   $scope.processForm = function() {
//     $http({
//       method  : 'POST',
//       url     : '/freq',
//       data    : $.param($scope.formData),  // pass in data as strings
//       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
//     })
//     .success(function(data, status, headers, config){
//       $scope.addFriendFlash = data;
//     });
//   }
// });

app.controller('AngularMainController', function($scope, $http) {

  $scope.init = function(frndReqs, frnds, userName, profPic){
    $scope.frndReqs = frndReqs;
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
      $scope.frnds.push(data.friends[data.friends.length - 1]);
      $scope.frndReqs = data.frReqs; //TODO PULL
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
      $scope.frndReqs = data.frReqs; //TODO PULL
    });
  }
});
