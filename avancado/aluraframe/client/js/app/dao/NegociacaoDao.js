class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = "negociacoes";
    }

    adicionar(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negociacao);
            request.onsuccess = (e) => {
                resolve();
            };
            request.onerror = (e) => {
                console.log(e.target.error);
                reject('Não foi possível inserir a negociação.');
            };
        });
    }

    listar() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();
            let negociacoes = [];
            cursor.onsuccess = (e) => {
                let atual = e.target.result;
                if(atual) {
                    let registro = atual.value;
                    negociacoes.push(new Negociacao(registro._data, registro._quantidade, registro._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };
            cursor.onerror = (e) => {
                reject("Não foi possível listar as negociações.");
            };
        });
    }

}