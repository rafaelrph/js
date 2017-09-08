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
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(xhr.responseText);
					}
				}
			}
			xhr.send(JSON.stringify(objeto));
		});
	}

}