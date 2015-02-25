'use strict';

angular.module('core').factory('Bishop', [
	function() {
		// Bishop service logic
		// ...
		function pad (str, max) {
 			str = str.toString();
  			return str.length < max ? pad('0' + str, max) : str;
		}

		var Bishop = function (options) {
			this.square = options.square;
			this.color = options.color;
		};

		Bishop.prototype.toString = function() {
			return pad(this.square, 2) + '2' + this.color;
		};

		return Bishop;
	}
]);