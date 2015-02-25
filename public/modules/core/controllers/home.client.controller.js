'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Board',
	function($scope, Board) {
		// This provides Authentication context.

		$scope.myBoard = new Board();
	}
]);