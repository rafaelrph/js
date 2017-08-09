var titulo = document.querySelector(".titulo");
titulo.textContent = "Nutricionista Aparecida";


var pacientes = document.querySelectorAll(".paciente");

for(var i=0; i < pacientes.length; i++) {
    var paciente = pacientes[i];

    var peso = paciente.querySelector(".info-peso").textContent;
    var altura = paciente.querySelector(".info-altura").textContent;
    var imc = paciente.querySelector(".info-imc");    

    imc.textContent = validarCalcularIMC(peso, altura);
}

function validarCalcularIMC(peso, altura) {

    if(!validaPeso(peso)) {
        console.log("Peso Inválido");
        paciente.classList.add("linha-invalida");
        return "Peso inválido";
    }

    if(!validaAltura(altura)) {
        console.log("Altura inválida");
        paciente.classList.add("linha-invalida");
        return "Altura inválida";
    }

    if(validaPaciente(peso, altura)) {
        return calculaIMC(peso, altura);
    }
}

function validaPaciente(peso, altura) {
    if(validaAltura(altura) && validaPeso(peso)) {
        return true;
    } else {
        return false;
    }
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