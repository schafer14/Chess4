'use strict';

angular.module('core').factory('Board', ['Config', 'Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King',
	function(Config, Pawn, Knight, Bishop, Rook, Queen, King) {
		// Board service logic
		// ...
		var pieceMapper = [Pawn, Knight, Bishop, Rook, Queen, King];

		var Board = function(options) {
			var self = this;
			options = options || {};

			self.pieces = [];
			self.squaresPerSide = options.squaresPerSide || 8;
			self.state = options.state || Config.standard.replace(/ /g, '');

			angular.forEach(self.state.match(/..../g), function(piece) {
				self.pieces.push(new pieceMapper[piece[2]] ({
					color: piece[3],
					square: piece.substring(0, 2)
				}));
			});
		};

		Board.prototype.toString = function() {
			var self = this;
			return self.pieces.map(function(piece) {
				return  piece.toString();
			}).join('');
		}

		return Board;
	}
]);