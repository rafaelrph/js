class HttpService {

	_handleError(response) {
		if(!response.ok) {
			throw new Error(res.statusText);
		}
		return response;
	}

    get(url) {
		return fetch(url)
			.then(response => this._handleError(response))
			.then(response => response.json());
	}
	
	post(url, objeto){
		return fetch(url, {
			headers: {'Content-type': 'application/json'},
			method: 'post',
			body: JSON.stringify(objeto)
		}).then(response => this._handleError(response));
	}

}