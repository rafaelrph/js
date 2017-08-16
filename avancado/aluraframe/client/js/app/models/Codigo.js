class Codigo {

    constructor (expressao) {
        this._expressao = expressao;
    }

    validar(codigo) {
        return this._expressao.test(codigo);
    }

}