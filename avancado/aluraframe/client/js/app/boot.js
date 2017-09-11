'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();

      document.querySelector("#btn-apagar").onclick = negociacaoController.removerTodos.bind(negociacaoController);
      document.querySelector(".form").onsubmit = negociacaoController.adicionar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map