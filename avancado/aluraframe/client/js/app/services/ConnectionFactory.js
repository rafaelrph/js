"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
    var dbName = "cursoalura";
    var versionDb = 1;
    var stores = ['negociacoes'];

    var connection = null;
    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error("Não é possível criar uma instância de ConnectionFactory.");
        }

        _createClass(ConnectionFactory, null, [{
            key: "getConnection",
            value: function getConnection() {
                return new Promise(function (resolve, reject) {
                    var openRequest = window.indexedDB.open(dbName, versionDb);

                    openRequest.onupgradeneeded = function (e) {
                        ConnectionFactory._createStore(e.target.result);
                    };

                    openRequest.onsuccess = function (e) {
                        if (!connection) {
                            connection = e.target.result;
                            close = connection.close.bind(connection);
                            connection.close = function () {
                                throw new Error("Você não pode fechar diretamente a conexão.");
                            };
                        }
                        resolve(connection);
                    };

                    openRequest.onerror = function (e) {
                        reject("Não foi possível buscar ou criar a conexão.");
                    };
                });
            }
        }, {
            key: "closeConnection",
            value: function closeConnection() {
                if (connection) {
                    close();
                    connection = null;
                }
            }
        }, {
            key: "_createStore",
            value: function _createStore(connection) {
                stores.forEach(function (store) {
                    if (connection.objectStoreNames.contains(store)) {
                        connection.deleteObjectStore(store);
                    }
                    connection.createObjectStore(store, { autoIncrement: true });
                });
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map