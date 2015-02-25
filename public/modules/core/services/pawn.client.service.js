'use strict';

angular.module('core').factory('Pawn', [
	function() {
		// Pawn service logic
		// ...
		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad("0" + str, max) : str;
		}

		var Pawn = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		Pawn.prototype.toString = function() {
			return pad(this.square, 2) + '0' + this.color;
		};

		return Pawn;
	}
]);