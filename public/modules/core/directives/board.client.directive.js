'use strict';

angular.module('core').directive('board', [
	function() {
		return {
			templateUrl: 'modules/core/templates/board.client.template.html',
			restrict: 'E',
			scope: {
				provider: '=',
			},
			link: function postLink(scope, element, attrs) {
				// Board directive logic
				// ...
				scope.squareIter = new Array(scope.provider.squaresPerSide)
				console.log(scope.provider)
			}
		};
	}
]);