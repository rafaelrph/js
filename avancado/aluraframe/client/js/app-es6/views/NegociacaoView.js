import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacaoView extends View {

    constructor(elemento) {
        super(elemento);
        elemento.addEventListener('click', function(event) {
            if(event.target.nodeName == 'TH') {
                currentInstance().ordenar(event.target.textContent.toLowerCase());
            }
        });
    }

    template (modelo) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th class='thordena'>DATA</th>
                        <th class='thordena'>QUANTIDADE</th>
                        <th class='thordena'>VALOR</th>
                        <th class='thordena'>VOLUME</th>
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