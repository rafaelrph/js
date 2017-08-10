var botaoAddPaciente = document.querySelector("#adicionar-paciente");
botaoAddPaciente.addEventListener("click", function(event){
    event.preventDefault();
    var formulario = document.querySelector("#formulario");

    //Valida o Paciente
    var erros = validaPaciente(formulario.peso.value, formulario.altura.value);
    if(erros.length > 0) {
        adicionaErros(erros);
        return;
    } else {
        verificarDiv();
    }

    var paciente = criarPaciente(formulario);
    addPacienteTabela(paciente);

    //Limpa o formulário
    formulario.reset();
});

function verificarDiv(){
    var divErros = document.querySelector("#erros");
    hideDiv(divErros);
}

function addPacienteTabela(paciente){
    //Adiciona o paciente na tabela
    var tr = montarTr(paciente);
    document.querySelector("#tabela-pacientes").appendChild(tr);
}

function criarPaciente(formulario) {
    var paciente = {
        nome: formulario.nome.value,
        peso: formulario.peso.value,
        altura: formulario.altura.value,
        gordura: formulario.gordura.value,
        imc: calculaIMC(formulario.peso.value, formulario.altura.value)
    }
    return paciente;
}

function montarTr(paciente) {
    var tr = document.createElement("tr");
    tr.appendChild(montarTd(paciente.nome, "info-nome"));
    tr.appendChild(montarTd(paciente.peso, "info-peso"));
    tr.appendChild(montarTd(paciente.altura, "info-altura"));
    tr.appendChild(montarTd(paciente.gordura, "info-gordura"));
    tr.appendChild(montarTd(paciente.imc, "info-imc"));
    return tr;
}

function montarTd(valor, classe){
    var td = document.createElement("td");
    td.textContent = valor;
    td.classList.add(classe);
    return td;
}

function adicionaErros(erros) {
    var divErros = document.querySelector("#erros");
    limparDiv(divErros);
    divErros.appendChild(montarUl(erros));
    showDiv(divErros);
}

function showDiv(div){
    div.classList.remove("hide");
}

function hideDiv(div) {
    div.classList.add("hide");
}

function limparDiv(div) {
    if(div.firstChild !== null) {
        div.removeChild(div.firstChild);
    }
}

function montarUl(erros) {
    var ul = document.createElement("ul");
    erros.forEach(function(erro) {
        ul.appendChild(montarLi(erro));
    });
    return ul;
}

function montarLi(valor) {
    var li = document.createElement("li");
    li.textContent = valor;
    return li;
}