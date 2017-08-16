class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this.campoData = $('#data');
		this.campoQuantidade = $('#quantidade');
		this.campoValor = $('#valor');
	}

	adicionar(event) {
		//let da = new DateHelper();
		event.preventDefault();
		let data = DateHelper.criarData(this.campoData.value);

		let negociacao = new Negociacao(data, this.campoQuantidade.value, this.campoValor.value);
		console.log(negociacao);
		console.log(DateHelper.formatData(data));
	}

}