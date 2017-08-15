class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
		this.campoData = $('#data');
		this.campoQuantidade = $('#quantidade');
		this.campoValor = $('#valor');
	}

	adicionar(event) {
		event.preventDefault();
		var data = new Date(this.campoData.value.split("-"));
		
		var negociacao = new Negociacao(data, this.campoQuantidade.value, this.campoValor.value);
		console.log(negociacao);
	}

}