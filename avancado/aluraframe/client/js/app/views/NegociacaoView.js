class NegociacaoView extends View {

    template (modelo) {
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
                                modelo.negociacoes.reduce((total, nego) => total + nego.volume, 0.0)
                            }
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
}