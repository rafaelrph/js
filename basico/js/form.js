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

    //Adiciona o paciente na tabela
    var tr = montarTr(formulario);
    document.querySelector("#tabela-pacientes").appendChild(tr);

    //Limpa o formulário
    formulario.reset();
});

function verificarDiv(){
    var divErros = document.querySelector("#erros");
    if(divErros.classList.contains("show")) {
        hideDiv(divErros);
    }
}

function montarTr(formulario) {
    var tr = document.createElement("tr");
    tr.appendChild(montarTd(formulario.nome.value, "info-nome"));
    tr.appendChild(montarTd(formulario.peso.value, "info-peso"));
    tr.appendChild(montarTd(formulario.altura.value, "info-altura"));
    tr.appendChild(montarTd(formulario.gordura.value, "info-gordura"));
    tr.appendChild(montarTd(calculaIMC(formulario.peso.value, formulario.altura.value), "info-imc"));
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
    div.classList.add("show");
}

function hideDiv(div) {
    div.classList.remove("show");
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