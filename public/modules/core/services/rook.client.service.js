'use strict';

angular.module('core').factory('Rook', [
	function() {
		// Rook service logic
		// ...

		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad('0' + str, max) : str;
		}

		var Rook = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		Rook.prototype.toString = function() {
			return pad(this.square, 2) + '3' + this.color;
		};

		return Rook;
	}
]);