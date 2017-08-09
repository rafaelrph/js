var botaoAddPaciente = document.querySelector("#adicionar-paciente");
botaoAddPaciente.addEventListener("click", function(event){
    event.preventDefault();
    var formulario = document.querySelector("#formulario");

    //Valida o Paciente
    if(! validaPaciente(formulario.peso.value, formulario.altura.value)) {
        alert("Paciente inválido");
        return;
    }

    //Adiciona o paciente na tabela
    var tr = montarTr(formulario);
    document.querySelector("#tabela-pacientes").appendChild(tr);

    //Limpa o formulário
    formulario.reset();
});

function montarTr(formulario) {
    var tr = document.createElement("tr");
    tr.appendChild(montarTd(formulario.nome.value, "info-nome"));
    tr.appendChild(montarTd(formulario.peso.value, "info-peso"));
    tr.appendChild(montarTd(formulario.altura.value, "info-altura"));
    tr.appendChild(montarTd(formulario.gordura.value, "info-gordura"));
    tr.appendChild(montarTd(validarCalcularIMC(formulario.peso.value, formulario.altura.value), "info-imc"));
    return tr;
}

function montarTd(valor, classe){
    var td = document.createElement("td");
    td.textContent = valor;
    td.classList.add(classe);
    return td;
}
