
var ConnectionFactory = (function () {
    const dbName = "cursoalura";
    const versionDb = 1;
    const stores = ['negociacoes'];

    let connection = null;
    let close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possível criar uma instância de ConnectionFactory.");
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, versionDb);

                openRequest.onupgradeneeded = (e) => {
                    ConnectionFactory._createStore(e.target.result)
                };

                openRequest.onsuccess = (e) => {
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => {
                            throw new Error("Você não pode fechar diretamente a conexão.");
                        }
                    }
                    resolve(connection);
                };

                openRequest.onerror = (e) => {
                    reject("Não foi possível buscar ou criar a conexão.");
                };
            });
        }

        static closeConnection() {
            if(connection) {
                close();
                connection = null;
            }
        }

        static _createStore(connection) {
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }
    }
})();