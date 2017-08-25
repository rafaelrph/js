class NegociacaoService {
	
	constructor() {
		this._http = new HttpService();
	}

    obterNegociacoesDaSemana() {
		return new Promise((resolve, reject) => {
			this._http.get('negociacoes/semana')
			.then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))) 
			.catch(erro => reject("Não foi possível buscar os registros da semana."))
		});
	}
	
	obterNegociacoesAnterior() {
		return new Promise((resolve, reject) => {
			this._http.get('negociacoes/anterior')
			.then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))) 
			.catch(erro => reject("Não foi possível buscar os registros da semana anterior."))
		});
	}

	obterNegociacoesRetrasada() {
		return new Promise((resolve, reject) => {
			this._http.get('negociacoes/retrasada')
			.then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))) 
			.catch(erro => reject("Não foi possível buscar os registros da retrasada."))
		});
	}

}