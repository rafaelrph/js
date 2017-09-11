class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template() {
        throw new Error("O método deve ser implementado.");
    }

    update (modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

}