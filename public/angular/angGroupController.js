app.controller('angGroupController', function($scope, $http) {

  $scope.init = function(){

  }

  $scope.createNewGroup = function(groupName){
    console.log("TEST");
    $http({
      method  : 'POST',
      url     : '/createGroup',
      data    : $.param({'groupName' : groupName}),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data, status, headers, config){
      //TODO
    });
  }
}
