'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, HttpService;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('HttpService', HttpService = function () {
				function HttpService() {
					_classCallCheck(this, HttpService);
				}

				_createClass(HttpService, [{
					key: '_handleError',
					value: function _handleError(response) {
						if (!response.ok) {
							throw new Error(res.statusText);
						}
						return response;
					}
				}, {
					key: 'get',
					value: function get(url) {
						var _this = this;

						return fetch(url).then(function (response) {
							return _this._handleError(response);
						}).then(function (response) {
							return response.json();
						});
					}
				}, {
					key: 'post',
					value: function post(url, objeto) {
						var _this2 = this;

						return fetch(url, {
							headers: { 'Content-type': 'application/json' },
							method: 'post',
							body: JSON.stringify(objeto)
						}).then(function (response) {
							return _this2._handleError(response);
						});
					}
				}]);

				return HttpService;
			}());

			_export('HttpService', HttpService);
		}
	};
});
//# sourceMappingURL=HttpService.js.map