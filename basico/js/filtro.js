var campoFiltro = document.querySelector("#filtro");
campoFiltro.addEventListener("input", function () {
    
    var pacientes = document.querySelectorAll(".paciente");
    for(var i=0; i < pacientes.length; i++) {
        if(this.value !== null) {
            if(this.value.length > 0) {
                var nome = pacientes[i].querySelector(".info-nome").textContent;
                if(nome != this.value) {
                    pacientes[i].classList.add("hide");
                } else {
                    pacientes[i].classList.remove("hide");
                }
            } else {
                pacientes[i].classList.remove("hide");
            }
        }
    }
});