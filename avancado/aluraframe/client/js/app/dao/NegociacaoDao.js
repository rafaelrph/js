class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = "negociacoes";
    }

    adicionar(negociacao) {
        let request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negociacao);
        request.onsucess = (e) => {
            resolve();
        };
        request.onerror = (e) => {
            console.log(e.target.error);
            reject('Não foi possível inserir a negociação.');
        }
    }

}