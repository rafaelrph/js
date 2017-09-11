class NegociacaoView extends View {

    template (modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th class='thordena' onclick="negociacaoController.ordenar('data')">DATA</th>
                        <th class='thordena' onclick="negociacaoController.ordenar('quantidade')">QUANTIDADE</th>
                        <th class='thordena' onclick="negociacaoController.ordenar('valor')">VALOR</th>
                        <th class='thordena' onclick="negociacaoController.ordenar('volume')">VOLUME</th>
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
                        <td>${modelo.volumeTotal}
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
}