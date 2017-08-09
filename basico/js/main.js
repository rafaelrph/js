var titulo = document.querySelector(".titulo");
titulo.textContent = "Nutricionista Aparecida";


var pacientes = document.querySelectorAll(".paciente");

for(var i=0; i < pacientes.length; i++) {
    var paciente = pacientes[i];

    var peso = paciente.querySelector(".info-peso").textContent;
    var altura = paciente.querySelector(".info-altura").textContent;
    var imc = paciente.querySelector(".info-imc");    

    imc.textContent = calculaIMC(peso, altura);
}

function validaPaciente(peso, altura) {
    var erros = [];

    if(!validaAltura(altura)) {
        erros.push("Altura inválida! ");
    } 
    if(!validaPeso(peso)) {
        erros.push("Peso inválido! ");
    }

    return erros;
}

function validaAltura(altura) {
    if(altura <= 0 || altura >= 3) {
        return false;
    } else {
        return true;
    }
}

function validaPeso(peso) {
    if(peso <= 0 || peso > 1000) {
        return false;
    } else {
        return true;
    }
}

function calculaIMC(peso, altura) {
    var imcCalculado = peso / (altura * 2);
    return imcCalculado.toFixed(2);
}