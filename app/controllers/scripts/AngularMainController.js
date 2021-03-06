
var app = angular.module('app', []);

app.controller('addFriendController', function($scope, $http) {
  $scope.formData = {"userEmail": "<%=user.email%>"};

  $scope.processForm = function() {
    $http({
      method  : 'POST',
      url     : '/freq',
      data    : $.param($scope.formData),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      $scope.addFriendFlash = data;
    });
  }
});

app.controller('seeFreqsController', function($scope, $http) {
  $http({
    method  : 'POST',
    url     : '/freqprofiles',
    data    : $.param({"freqs":'<%=user.frReqs%>'.split(',')}),
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
  })
  .success(function(data, status, headers, config){
    $scope.freqProfiles = data;
  });
});
