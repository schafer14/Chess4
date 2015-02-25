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
				scope.squareIter = new Array(scope.provider.squaresPerSide)				
				var groupsOfFourRegex = /..../g;

				scope.drawBoard = function(board) {
					if (angular.isUndefined(board)) {
						return false;
					}

					scope.squares = {};
					var pieces = board.match(groupsOfFourRegex);
					angular.forEach(pieces, function(piece) {
						scope.squares[piece.substring(0, 2)] = piece[2] + piece[3];
					});
				};

				scope.$watch('provider.toString()', function(value) {
					scope.drawBoard(scope.provider.toString());
				});
			}
		};
	}
]);