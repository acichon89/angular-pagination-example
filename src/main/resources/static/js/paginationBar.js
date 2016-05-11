/**
 * 
 */
var searchApp = angular.module('searchApp', []);

searchApp.directive('paginationBar', function () {
	return {
		scope: {
			totalrecords: '=',
			rowsperpage: '=',
			abstractLoad: '&loaddatafunction'
		},
		link : function($scope) {
			  //stalki:
			  $scope.currentPage = 1;
			  $scope.pageIndexesMinCountToBeShortenOnBar = 4;
			  $scope.shownshortenedPageIndexesOnBar=3;
			  
			  $scope.range = function(min, max, step){
				step = step || 1;
				var input = [];
				for (var i = min; i <= max; i += step) input.push(i);
				return input;
			  };
			  
			  $scope.getNumberOfPages = function() {
				return Math.ceil($scope.totalrecords / $scope.rowsperpage);
			  };
			  
			  $scope.getIndexOfFirstItem = function() {
				return $scope.currentPage==1 ? 0 : ($scope.currentPage-1)*$scope.rowsperpage; 
			  };
			  
			  $scope.getPaginationBarFirstPage = function(){
					if($scope.getNumberOfPages()==0){
						return 0;
					}
					if($scope.getNumberOfPages() <= $scope.pageIndexesMinCountToBeShortenOnBar){
						return 1;
					}
					var leftSpace = $scope.shownshortenedPageIndexesOnBar%2==0 ? Math.floor($scope.shownshortenedPageIndexesOnBar/2)-1 : Math.floor($scope.shownshortenedPageIndexesOnBar/2);
					var rightSpace = Math.floor($scope.shownshortenedPageIndexesOnBar/2);
					var value;
					if($scope.currentPage - leftSpace <=0){
						value = 1; 
					}
					else if($scope.getNumberOfPages()-$scope.currentPage<rightSpace){
						var heap = ($scope.shownshortenedPageIndexesOnBar-1) - ($scope.getNumberOfPages()-$scope.currentPage);
						value = $scope.currentPage - heap;
					}
					else{
						value = $scope.currentPage-leftSpace;
					}
					return value;
				};
				
				$scope.getPaginationBarLastPage = function(){
					if($scope.getNumberOfPages()==0){
						return 0;
					}
					if($scope.getNumberOfPages() <= $scope.pageIndexesMinCountToBeShortenOnBar){
						return $scope.getNumberOfPages();
					}
					return $scope.getPaginationBarFirstPage()+$scope.shownshortenedPageIndexesOnBar-1;
				};
				
				$scope.displayDotsAtBeggining = function(){
					return $scope.totalrecords!==0 && $scope.getPaginationBarFirstPage()!==1 && $scope.getPaginationBarFirstPage()>2;
				};
				
				$scope.displayDotsAtEnd = function(){
					return $scope.totalrecords!==0 && $scope.getPaginationBarLastPage()!=$scope.getNumberOfPages() && $scope.getNumberOfPages() - $scope.getPaginationBarLastPage() >1;
				};
				
				$scope.displayFirstButton = function(){
					return $scope.getPaginationBarFirstPage()!==1;
				};
				
				$scope.displayLastButton = function(){
					return $scope.getPaginationBarLastPage() !== $scope.getNumberOfPages();
				};
				
				$scope.disableFirstButton = function(){
					return $scope.totalrecords==0 || $scope.currentPage==1;
				};
			  
				$scope.disableBackButton = function() {
					return $scope.totalrecords==0 || $scope.currentPage==1;
				};
			  
				$scope.disableNextButton = function(){
					return $scope.totalrecords==0 || $scope.currentPage==$scope.getNumberOfPages();
				};
				
				$scope.disableLastButton = function(){
					return $scope.totalrecords==0 || $scope.currentPage==$scope.getNumberOfPages();
				};
				
				$scope.clickFirstButton = function() {
					if(!$scope.disableFirstButton() ){
						$scope.goToPage(1);
					}
				}
				
				$scope.evaluateFirstButtonClass = function() {
					var className = 'middle button';
					if($scope.disableFirstButton()) {
						className += ' disabled';
					}
					return className;
				}
				
				$scope.evaluateDisableIndex = function(index) {
					return $scope.getClassOfPageIndex(index) == "middle button disabled";
				}
				
				$scope.getClassOfPageIndex = function(index){
					if(index==0){
						return "middle button disabled";
					}
					else{
						return index == $scope.currentPage ? "middle button disabled" : "middle button";
					}
				}
				
				$scope.evaluateOnClick = function(index) {
					if($scope.getClassOfPageIndex(index) !== "middle button disabled") {
						$scope.goToPage(index);
					}
				}
				
				$scope.evaluateLastButtonClass = function() {
					var className = 'middle button';
					if($scope.disableLastButton()) {
						className += ' disabled';
					}
					return className;
				}
				
				$scope.clickLastButton = function() {
					if(!$scope.disableLastButton() ){
						$scope.goToPage($scope.getNumberOfPages());
					}
				}
				
				  $scope.goToPage = function(index) {
					$scope.currentPage = index;
					var idx = $scope.getIndexOfFirstItem();
					$scope.abstractLoad({startIndex : idx});
				  };
		
			$scope.$watch(function() { return $scope.totalrecords;}, function(newValue, oldValue) {
				$scope.currentPage = 1;
			});
		},
		restrict: 'E',
		templateUrl: '/html/paginationbar.html'
	}
});
