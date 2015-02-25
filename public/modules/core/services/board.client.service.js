'use strict';

angular.module('core').factory('Board', [
	function() {
		// Board service logic
		// ...

		var Board = function(options) {
			var self = this;
			options = options || {};

			self.squaresPerSide = options.squaresPerSide || 8;
		};

		return Board;
	}
]);