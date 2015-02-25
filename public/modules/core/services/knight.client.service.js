'use strict';

angular.module('core').factory('Knight', [
	function() {
		// Knight service logic
		// ...
		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad('0' + str, max) : str;
		}

		var Knight = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		Knight.prototype.toString = function() {
			return pad(this.square, 2) + '1' + this.color;
		};

		return Knight;
	}
]);