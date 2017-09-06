class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._campoData = $('#data');
		this._campoQuantidade = $('#quantidade');
		this._campoValor = $('#valor');
		this._ordemAtual = '';
		this._service = new NegociacaoService();
		this._listaNegociacoes = new Binding(new ListaNegociacoes(), new NegociacaoView($("#negociacoes")), 'adicionar', 'esvaziar', 'ordenar', 'inverter', 'listar');		
		this._mensagem = new Binding(new Mensagem(), new MensagemView($("#mensagem")), 'texto');
		this._init();
	}

	_init() {
		setInterval(() => { 
			this.importarTodasNegociacoes();
		}, 3000);
	}

	adicionar(event) {
		event.preventDefault();
		let negociacao = this._criarNegociacao();
		this._service.adicionar(negociacao).then(mensagem => {
			this._listaNegociacoes.adicionar(negociacao);
			this._mensagem.texto = "Negociação adicionada com sucesso.";	
			this._limparFormulario();
		}).catch(error => this._mensagem.texto = error);
	}

	listarTodosDb() {
		this._service.listar()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
			}).catch(error => this._mensagem.texto = error);
	}

	removerTodos() {
		this._service.removerTodos()
			.then(() => {
				this._listaNegociacoes.esvaziar();
				this._mensagem.texto = 'Negociações apagadas com sucesso';
			}).catch(error => this._mensagem.texto = error);
	}

	_criarNegociacao() {
		let data = DateHelper.textoParaData(this._campoData.value);
		return new Negociacao(data, this._campoQuantidade.value, this._campoValor.value)
	}

	_limparFormulario() {
		this._campoData.value = "";
		this._campoQuantidade.value = 1;
		this._campoValor.value = 0;
		this._campoData.focus();
	}

	apagarLista() {
		this._listaNegociacoes.esvaziar();
		this._mensagem.texto = "Negociações apagadas com sucesso.";
	}

	importarTodasNegociacoes() {
		this._service.importar(this._listaNegociacoes)
		.then(negociacoes => 
			negociacoes.forEach(negociacao => {
				this._listaNegociacoes.adicionar(negociacao)
				this._mensagem.texto = "Negociações importadas com sucesso.";
			})
		)
		.catch(error => this._mensagem.texto = error);
	}

	importarNegociacoes() {
		this._service.obterNegociacoesDaSemana()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações importadas com sucesso.";
			})
			.catch(error => this._mensagem.texto = error);
		
	}

	importarNegociacoesAnteriores() {
		this._service.obterNegociacoesAnterior()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações anteriores importadas com sucesso.";
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	importarNegociacoesRetrasadas() {
		this._service.obterNegociacoesRetrasada()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações retrasadas importadas com sucesso.";
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	ordenar(coluna) {
		if(this._ordemAtual == coluna) {
			this._listaNegociacoes.inverter();
		} else {
			this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	}

}