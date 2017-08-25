class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._campoData = $('#data');
		this._campoQuantidade = $('#quantidade');
		this._campoValor = $('#valor');

		this._listaNegociacoes = new Binding(new ListaNegociacoes(), new NegociacaoView($("#negociacoes")), 'adicionar', 'esvaziar');		
		this._mensagem = new Binding(new Mensagem(), new MensagemView($("#mensagem")), 'texto');
	}

	adicionar(event) {
		event.preventDefault();
		this._listaNegociacoes.adicionar(this._criarNegociacao());
		this._mensagem.texto = "Negociação adicionada com sucesso.";
		
		this._limparFormulario();
	}

	_criarNegociacao() {
		let data = DateHelper.criarData(this._campoData.value);
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

	importarNegociacoes() {
		let service = new NegociacaoService();
		service.obterNegociacoesDaSemana()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações importadas com sucesso.";
			})
			.catch(error => this._mensagem.texto = error);
		
	}

	importarNegociacoesAnteriores() {
		let service = new NegociacaoService();
		service.obterNegociacoesAnterior()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações anteriores importadas com sucesso.";
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	importarNegociacoesRetrasadas() {
		let service = new NegociacaoService();
		service.obterNegociacoesRetrasada()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
				this._mensagem.texto = "Negociações retrasadas importadas com sucesso.";
			})
			.catch(erro => this._mensagem.texto = erro);
	}

}