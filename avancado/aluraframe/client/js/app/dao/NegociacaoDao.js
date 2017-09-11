'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = "negociacoes";
    }

    _createClass(NegociacaoDao, [{
        key: 'adicionar',
        value: function adicionar(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);
                request.onsuccess = function (e) {
                    return resolve();
                };
                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível inserir a negociação.');
                };
            });
        }
    }, {
        key: 'listar',
        value: function listar() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();
                var negociacoes = [];
                cursor.onsuccess = function (e) {
                    var atual = e.target.result;
                    if (atual) {
                        var registro = atual.value;
                        negociacoes.push(new Negociacao(registro._data, registro._quantidade, registro._valor));
                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };
                cursor.onerror = function (e) {
                    reject("Não foi possível listar as negociações.");
                };
            });
        }
    }, {
        key: 'removerTodos',
        value: function removerTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();
                cursor.onsuccess = function (e) {
                    return resolve();
                };
                cursor.onerror = function (e) {
                    return reject("Não foi possível remover todas as negociações.");
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map