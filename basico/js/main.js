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
    var pesoValido = true;
    var alturaValida = true;

    if(peso <= 0 || peso > 1000) {
        console.log("Peso Inválido");
        pesoValido = false;
        paciente.style.backgroundColor = "yellow";
        return "Peso inválido";
    }

    if(altura <= 0 || altura >= 3) {
        console.log("Altura inválida");
        alturaValida = false;
        paciente.classList.add("linha-invalida");
        return "Altura inválida";
    }

    if(pesoValido && alturaValida) {
        return calculaIMC(peso, altura);
    }
}

function calculaIMC(peso, altura) {
    var imcCalculado = peso / (altura * 2);
    return imcCalculado.toFixed(2);
}