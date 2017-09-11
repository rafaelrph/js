'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
	function NegociacaoService() {
		_classCallCheck(this, NegociacaoService);

		this._http = new HttpService();
	}

	_createClass(NegociacaoService, [{
		key: 'adicionar',
		value: function adicionar(negociacao) {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.adicionar(negociacao);
			}).then(function () {
				return 'Negociação cadastrada com sucesso';
			}).catch(function (error) {
				throw new Error('Não foi possível adicionar a negociação.');
			});
		}
	}, {
		key: 'listar',
		value: function listar() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.listar();
			});
		}
	}, {
		key: 'removerTodos',
		value: function removerTodos() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.removerTodos();
			});
		}
	}, {
		key: 'importar',
		value: function importar(listaAtual) {
			var _this = this;

			return this.obterTodasNegociacoes().then(function (negociacoes) {
				return negociacoes.filter(function (negociacao) {
					return !listaAtual.negociacoes.some(function (negociacaoExistente) {
						return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
					});
				});
			}).catch(function (error) {
				return _this._mensagem.texto = error;
			});
		}
	}, {
		key: 'obterTodasNegociacoes',
		value: function obterTodasNegociacoes() {
			return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesAnterior(), this.obterNegociacoesRetrasada()]).then(function (negociacoesPeriodo) {
				var negociacoes = negociacoesPeriodo.reduce(function (arrayNegociacoes, array) {
					return arrayNegociacoes.concat(array);
				}, []);
				return negociacoes;
			}).catch(function (erro) {
				throw new Error(erro);
			});
		}
	}, {
		key: 'obterNegociacoesDaSemana',
		value: function obterNegociacoesDaSemana() {
			return this._http.get('negociacoes/semana').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				throw new Error("Não foi possível buscar os registros da semana.");
			});
		}
	}, {
		key: 'obterNegociacoesAnterior',
		value: function obterNegociacoesAnterior() {
			return this._http.get('negociacoes/anterior').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				throw new Error("Não foi possível buscar os registros da semana anterior.");
			});
		}
	}, {
		key: 'obterNegociacoesRetrasada',
		value: function obterNegociacoesRetrasada() {
			return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
				return negociacoes.map(function (objeto) {
					return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
				});
			}).catch(function (erro) {
				throw new Error("Não foi possível buscar os registros da retrasada.");
			});
		}
	}]);

	return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map