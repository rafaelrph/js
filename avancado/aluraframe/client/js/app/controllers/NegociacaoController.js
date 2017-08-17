class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._campoData = $('#data');
		this._campoQuantidade = $('#quantidade');
		this._campoValor = $('#valor');
		this._listaNegociacoes = new ListaNegociacoes();
		
		this._negociacaoView = new NegociacaoView($("#negociacoes"));
		this._negociacaoView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($("#mensagem"));
		this._mensagemView.update(this._mensagem);
	}

	adicionar(event) {
		event.preventDefault();
		this._listaNegociacoes.adicionar(this._criarNegociacao());

		this._negociacaoView.update(this._listaNegociacoes);

		this._mensagem.texto = "Negociação adicionada com sucesso.";
		this._mensagemView.update(this._mensagem);
		
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

}