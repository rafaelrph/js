'use strict';

System.register(['../services/NegociacaoService', '../models/ListaNegociacoes', '../helpers/Binding', '../helpers/DateHelper', '../models/Negociacao', '../models/Mensagem', '../views/MensagemView', '../views/NegociacaoView'], function (_export, _context) {
	"use strict";

	var NegociacaoService, ListaNegociacoes, Binding, DateHelper, Negociacao, Mensagem, MensagemView, NegociacaoView, _createClass, NegociacaoController;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_servicesNegociacaoService) {
			NegociacaoService = _servicesNegociacaoService.NegociacaoService;
		}, function (_modelsListaNegociacoes) {
			ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
		}, function (_helpersBinding) {
			Binding = _helpersBinding.Binding;
		}, function (_helpersDateHelper) {
			DateHelper = _helpersDateHelper.DateHelper;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}, function (_modelsMensagem) {
			Mensagem = _modelsMensagem.Mensagem;
		}, function (_viewsMensagemView) {
			MensagemView = _viewsMensagemView.MensagemView;
		}, function (_viewsNegociacaoView) {
			NegociacaoView = _viewsNegociacaoView.NegociacaoView;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacaoController', NegociacaoController = function () {
				function NegociacaoController() {
					_classCallCheck(this, NegociacaoController);

					var $ = document.querySelector.bind(document);
					this._campoData = $('#data');
					this._campoQuantidade = $('#quantidade');
					this._campoValor = $('#valor');
					this._ordemAtual = '';
					this._service = new NegociacaoService();
					this._listaNegociacoes = new Binding(new ListaNegociacoes(), new NegociacaoView($("#negociacoes")), 'adicionar', 'esvaziar', 'ordenar', 'inverter', 'listar');
					this._mensagem = new Binding(new Mensagem(), new MensagemView($("#mensagem")), 'texto');
					this._init();
				}

				_createClass(NegociacaoController, [{
					key: '_init',
					value: function _init() {
						var _this = this;

						setInterval(function () {
							_this.importarTodasNegociacoes();
						}, 3000);
					}
				}, {
					key: 'adicionar',
					value: function adicionar(event) {
						var _this2 = this;

						event.preventDefault();
						var negociacao = this._criarNegociacao();
						this._service.adicionar(negociacao).then(function (mensagem) {
							_this2._listaNegociacoes.adicionar(negociacao);
							_this2._mensagem.texto = "Negociação adicionada com sucesso.";
							_this2._limparFormulario();
						}).catch(function (error) {
							return _this2._mensagem.texto = error;
						});
					}
				}, {
					key: 'listarTodosDb',
					value: function listarTodosDb() {
						var _this3 = this;

						this._service.listar().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this3._listaNegociacoes.adicionar(negociacao);
							});
						}).catch(function (error) {
							return _this3._mensagem.texto = error;
						});
					}
				}, {
					key: 'removerTodos',
					value: function removerTodos() {
						var _this4 = this;

						this._service.removerTodos().then(function () {
							_this4._listaNegociacoes.esvaziar();
							_this4._mensagem.texto = 'Negociações apagadas com sucesso';
						}).catch(function (error) {
							return _this4._mensagem.texto = error;
						});
					}
				}, {
					key: '_criarNegociacao',
					value: function _criarNegociacao() {
						var data = DateHelper.textoParaData(this._campoData.value);
						return new Negociacao(data, this._campoQuantidade.value, this._campoValor.value);
					}
				}, {
					key: '_limparFormulario',
					value: function _limparFormulario() {
						this._campoData.value = "";
						this._campoQuantidade.value = 1;
						this._campoValor.value = 0;
						this._campoData.focus();
					}
				}, {
					key: 'apagarLista',
					value: function apagarLista() {
						this._listaNegociacoes.esvaziar();
						this._mensagem.texto = "Negociações apagadas com sucesso.";
					}
				}, {
					key: 'importarTodasNegociacoes',
					value: function importarTodasNegociacoes() {
						var _this5 = this;

						this._service.importar(this._listaNegociacoes).then(function (negociacoes) {
							return negociacoes.forEach(function (negociacao) {
								_this5._listaNegociacoes.adicionar(negociacao);
								_this5._mensagem.texto = "Negociações importadas com sucesso.";
							});
						}).catch(function (error) {
							return _this5._mensagem.texto = error;
						});
					}
				}, {
					key: 'importarNegociacoes',
					value: function importarNegociacoes() {
						var _this6 = this;

						this._service.obterNegociacoesDaSemana().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this6._listaNegociacoes.adicionar(negociacao);
							});
							_this6._mensagem.texto = "Negociações importadas com sucesso.";
						}).catch(function (error) {
							return _this6._mensagem.texto = error;
						});
					}
				}, {
					key: 'importarNegociacoesAnteriores',
					value: function importarNegociacoesAnteriores() {
						var _this7 = this;

						this._service.obterNegociacoesAnterior().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this7._listaNegociacoes.adicionar(negociacao);
							});
							_this7._mensagem.texto = "Negociações anteriores importadas com sucesso.";
						}).catch(function (erro) {
							return _this7._mensagem.texto = erro;
						});
					}
				}, {
					key: 'importarNegociacoesRetrasadas',
					value: function importarNegociacoesRetrasadas() {
						var _this8 = this;

						this._service.obterNegociacoesRetrasada().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this8._listaNegociacoes.adicionar(negociacao);
							});
							_this8._mensagem.texto = "Negociações retrasadas importadas com sucesso.";
						}).catch(function (erro) {
							return _this8._mensagem.texto = erro;
						});
					}
				}, {
					key: 'ordenar',
					value: function ordenar(coluna) {
						if (this._ordemAtual == coluna) {
							this._listaNegociacoes.inverter();
						} else {
							this._listaNegociacoes.ordenar(function (a, b) {
								return a[coluna] - b[coluna];
							});
						}
						this._ordemAtual = coluna;
					}
				}]);

				return NegociacaoController;
			}());

			_export('NegociacaoController', NegociacaoController);
		}
	};
});
//# sourceMappingURL=NegociacaoController.js.map