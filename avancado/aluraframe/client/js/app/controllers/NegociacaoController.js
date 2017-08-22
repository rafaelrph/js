class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this._campoData = $('#data');
		this._campoQuantidade = $('#quantidade');
		this._campoValor = $('#valor');

		this._negociacaoView = new NegociacaoView($("#negociacoes"));
		this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacaoView, ['adicionar', 'esvaziar']);		

		this._mensagemView = new MensagemView($("#mensagem"));
		this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto']);
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