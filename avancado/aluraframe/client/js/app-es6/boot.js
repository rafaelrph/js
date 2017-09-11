import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();
document.querySelector("#btn-apagar").onclick = negociacaoController.removerTodos.bind(negociacaoController);
document.querySelector(".form").onsubmit = negociacaoController.adicionar.bind(negociacaoController);