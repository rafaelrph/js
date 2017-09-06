class NegociacaoService {
	
	constructor() {
		this._http = new HttpService();
	}

	adicionar(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adicionar(negociacao))
			.then(() => 'Negociação cadastrada com sucesso')
			.catch(error => {
				throw new Error('Não foi possível adicionar a negociação.');
			});
	}

	obterTodasNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesAnterior(),
			this.obterNegociacoesRetrasada()
		])
		.then(negociacoesPeriodo => {
			let negociacoes = negociacoesPeriodo.reduce((arrayNegociacoes, array) => arrayNegociacoes.concat(array), []);
			return negociacoes;
		})
		.catch(erro => {
			throw new Error(erro);
		});
	}

    obterNegociacoesDaSemana() {
		return this._http.get('negociacoes/semana')
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
			}) 
			.catch(erro => {
				throw new Error("Não foi possível buscar os registros da semana.")
			});
	}
	
	obterNegociacoesAnterior() {
		return this._http.get('negociacoes/anterior')
		.then(negociacoes => {
			return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
		}) 
		.catch(erro => {
			throw new Error("Não foi possível buscar os registros da semana anterior.")
		});
	}

	obterNegociacoesRetrasada() {
		return this._http.get('negociacoes/retrasada')
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
			}) 
			.catch(erro => {
				throw new Error("Não foi possível buscar os registros da retrasada.")
			});
	}

}