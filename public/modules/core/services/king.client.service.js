'use strict';

angular.module('core').factory('King', [
	function() {
		// King service logic
		// ...

		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad('0' + str, max) : str;
		}

		var King = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		King.prototype.toString = function() {
			return pad(this.square, 2) + '5' + this.color;
		};

		return King;
	}
]);