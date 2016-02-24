angular.module('app', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    	
    	$urlRouterProvider.otherwise('/about');
    	
    	$locationProvider.html5Mode(true);
    	
    	$stateProvider
	    	.state('about', {
	    		url: '/about',
	    		templateUrl: '/templates/about.html',
	    		controller: 'MainController'
	    	})
	    	.state('location', {
	    		url: '/location',
	    		templateUrl: '/templates/location.html',
	    		controller: 'MainController'
	    	})
	    	.state('facilities', {
	    		url: '/facilities',
	    		templateUrl: '/templates/facilities.html',
	    		controller: 'MainController'
	    	})
	    	.state('rental', {
	    		url: '/rental',
	    		templateUrl: '/templates/rental.html',
	    		controller: 'MainController'
	    	})
	    	.state('contact', {
	    		url: '/contact',
	    		templateUrl: '/templates/contact.html',
	    		controller: 'MainController'
	    	});
    })
    .directive('mainNav', function(){
		return {
			templateUrl: '/templates/nav.html'
		};
	})
;

	angular.module('app').controller('MainController', [
		'$rootScope',
		'$scope', 
		'$http',

		function ($rootScope, $scope, $http) {

			$http({
		      method: 'GET',
		      url: '/data/data.json'
		    }).then(function successCallback(response) {
		      $scope.navItems = response.data;		    
		    }, function errorCallback(response) {
		      $scope.navItems = {};		    
		    });

		    $scope.mobileActive = false;
		  
		  	$scope.mobileMenu = function() {
		  		if ($scope.mobileActive) {
		  			$scope.mobileActive = false;
		  		} else {
		  			$scope.mobileActive = true;
		  		}
		  	};
		}
	]);