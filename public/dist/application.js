'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Setting up route
angular.module('core').constant('Config', {
	standard:
		// Black pawns 
		'1001 1101 1201 1301 1401 1501 1601 1701' +
		// White pawns
		'6000 6100 6200 6300 6400 6500 6600 6700' +
		// Black Pieces
		'0031 0111 0221 0341 0451 0521 0611 0731' +
		// White Pieces
		'7030 7110 7220 7340 7450 7520 7610 7730',

});
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Board',
	function($scope, Board) {
		// This provides Authentication context.

		$scope.myBoard = new Board();
	}
]);
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