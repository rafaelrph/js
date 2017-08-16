class DateHelper {

    constructor(){
        throw new Error("DateHelper não pode ser instanciado.");
    }

    static criarData(string) {
        if( ! /^\d{4}-\d{2}-\d{2}$/.test(string)) {
            throw new Error("String inválida");
        }
        return new Date(...string.split("-")
			.map((item, index) => item - index % 2)
		);
    }

    static formatData(data) {
		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
	}

}