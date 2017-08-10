var btnBusca = document.querySelector("#btn-busca");
btnBusca.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientesss");
    xhr.addEventListener("load", function(){
        console.log(xhr);
        if(xhr.status == 200) {
            var pacientes = JSON.parse(xhr.responseText);
            pacientes.forEach(function(paciente) {
                addPacienteTabela(paciente);
            });
        } else {
            alert("Erro " + xhr.status + " ao buscar dados na API");
        }
    });
    xhr.send();
});