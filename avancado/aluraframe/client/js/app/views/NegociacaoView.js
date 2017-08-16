class NegociacaoView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    update(modelo) {
        this._elemento.innerHTML = this._template(modelo);
    }

    _template (modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${modelo.negociacoes.map(neg => {
                        return `
                            <tr>
                                <td>${DateHelper.formatData(neg.data)}</td>
                                <td>${neg.quantidade}</td>
                                <td>${neg.valor}</td>
                                <td>${neg.volume}</td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
                
                <tfoot>
                </tfoot>
            </table>
        `;
    }
}