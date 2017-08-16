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
                    ${modelo.negociacoes.map(neg => 
                        `
                            <tr>
                                <td>${DateHelper.formatData(neg.data)}</td>
                                <td>${neg.quantidade}</td>
                                <td>${neg.valor}</td>
                                <td>${neg.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>
                
                <tfoot>
                    <tr>
                        <td colspan='3'>VOLUME TOTAL</td>
                        <td>${
                                (function() {
                                    let total = 0;
                                    modelo.negociacoes.forEach(n => total += n.volume);
                                    return total;
                                })()
                            }
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}