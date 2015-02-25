'use strict';

angular.module('core').factory('Queen', [
	function() {
		// Queen service logic
		// ...
		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad('0' + str, max) : str;
		}

		var Queen = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		Queen.prototype.toString = function() {
			return pad(this.square, 2) + '4' + this.color;
		};

		return Queen;
	}
]);