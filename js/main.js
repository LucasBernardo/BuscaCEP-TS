var cepInput = document.getElementById("cepDigitado");
var btnLimpar = document.getElementById("btn-limpar");
var btnBuscar = document.getElementById("btn-buscar");
var enderecoInfo = document.getElementById("enderecoInfo");
var bairroInfo = document.getElementById("bairroInfo");
var cidadeInfo = document.getElementById("cidadeInfo");
var estadoInfo = document.getElementById("estadoInfo");
cepInput.addEventListener("input", function () {
    cepInput.value = aplicarMascaraCEP(cepInput.value);
});
btnBuscar.addEventListener("click", function () {
    var cepSemMascara = removerMascaraCEP(cepInput.value);
    buscarEndereco(cepSemMascara);
});
btnLimpar.addEventListener("click", function () {
    limparFormulario();
});
function aplicarMascaraCEP(cep) {
    return cep
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2');
}
function removerMascaraCEP(cep) {
    return cep.replace(/\D/g, '');
}
function limparFormulario() {
    cepInput.value = "";
    enderecoInfo.value = "";
    bairroInfo.value = "";
    cidadeInfo.value = "";
    estadoInfo.value = "";
}
function buscarEndereco(cep) {
    fetch("https://viacep.com.br/ws/".concat(cep, "/json"))
        .then(function (response) {
        if (!response.ok) {
            limparFormulario();
            throw new Error("Erro ao buscar CEP. Verifique e tente novamente.");
        }
        return response.json();
    })
        .then(function (data) {
        if (data.status === 400 || !data.logradouro || !data.localidade || !data.estado) {
            limparFormulario();
            throw new Error("CEP não encontrado! Verifique e tente novamente.");
        }
        enderecoInfo.value = data.logradouro;
        bairroInfo.value = data.bairro;
        cidadeInfo.value = data.localidade;
        estadoInfo.value = "".concat(data.estado, " - ").concat(data.uf);
    })
        .catch(function (error) {
        console.error("Erro ao buscar CEP:", error.message);
        alert(error.message);
    });
}
