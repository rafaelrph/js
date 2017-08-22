class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._campoData = $('#data');
		this._campoQuantidade = $('#quantidade');
		this._campoValor = $('#valor');

		this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adicionar', 'esvaziar'], model => this._negociacaoView.update(model));		
		this._negociacaoView = new NegociacaoView($("#negociacoes"));
		//this._negociacaoView.update(this._listaNegociacoes);

		this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model));
		this._mensagemView = new MensagemView($("#mensagem"));
		this._mensagemView.update(this._mensagem);
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

}