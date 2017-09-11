import {NegociacaoController} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = new NegociacaoController();
document.querySelector("#btn-apagar").onclick = negociacaoController.removerTodos.bind(negociacaoController);
document.querySelector(".form").onsubmit = negociacaoController.adicionar.bind(negociacaoController);