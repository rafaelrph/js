class ListaNegociacoes {
    
    constructor(trigger) {
        this._negociacoes = [];
        this._trigger = trigger;
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        this._trigger(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvaziar() {
        this._negociacoes = [];
        this._trigger(this);
    }
}