'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = new NegociacaoController();

      document.querySelector("#btn-apagar").onclick = negociacaoController.removerTodos.bind(negociacaoController);
      document.querySelector(".form").onsubmit = negociacaoController.adicionar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map