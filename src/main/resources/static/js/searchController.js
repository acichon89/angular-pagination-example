searchApp.controller('SearchVehicleCtrl', function ($scope, $window, $http) {
  
  $scope.userPreferencesRowsPerPage = 10;	//whatever, take it from user preferences, etc...

  
  $scope.loadData = function(startIndex) {
	$http({
		method : 'GET',
		url : '/find?start='+startIndex+'&max='+$scope.userPreferencesRowsPerPage,
	}).then(function successCallback(response) {
		$scope.vehicles = response.data;
	}, function errorCallback(response) {
		$scope.vehicles = [];
	});
  }
  
   
  	$http({
		method : 'GET',
		url : '/find?start=0&max='+$scope.userPreferencesRowsPerPage,
	}).then(function successCallback(response) {
		$scope.vehicles = response.data;
	}, function errorCallback(response) {
		$scope.vehicles = [];
	});

	$http({
		method : 'GET',
		url : '/count',
	}).then(function successCallback(response) {
		$scope.vehiclesCount = response.data;
	}, function errorCallback(response) {
		$scope.vehiclesCount = 0;
	});	

});