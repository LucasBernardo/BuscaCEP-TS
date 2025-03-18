const cepInput = document.getElementById("cepDigitado") as HTMLInputElement;
const btnLimpar = document.getElementById("btn-limpar") as HTMLButtonElement;
const btnBuscar = document.getElementById("btn-buscar") as HTMLButtonElement;
const enderecoInfo = document.getElementById("enderecoInfo") as HTMLInputElement;
const bairroInfo = document.getElementById("bairroInfo") as HTMLInputElement;
const cidadeInfo = document.getElementById("cidadeInfo") as HTMLInputElement;
const estadoInfo = document.getElementById("estadoInfo") as HTMLInputElement;

cepInput.addEventListener("input", () => {
    cepInput.value = aplicarMascaraCEP(cepInput.value);
});

btnBuscar.addEventListener("click", () => {
    const cepSemMascara = removerMascaraCEP(cepInput.value);
    buscarEndereco(cepSemMascara);
});

btnLimpar.addEventListener("click", () => {
    limparFormulario();
});

function aplicarMascaraCEP(cep: string): string {
    return cep
        .replace(/\D/g, '') // Remove tudo que não for número
        .replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o traço após os primeiros 5 dígitos
}

function removerMascaraCEP(cep: string): string {
    return cep.replace(/\D/g, ''); // Remove tudo que não for número
}

function limparFormulario(){
    cepInput.value = "";
    enderecoInfo.value = "";
    bairroInfo.value = "";
    cidadeInfo.value = "";
    estadoInfo.value = "";
}

function buscarEndereco(cep: string) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => {
            if (!response.ok) {
                limparFormulario();
                throw new Error("Erro ao buscar CEP. Verifique e tente novamente.");
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 400 || !data.logradouro || !data.localidade || !data.estado) {
                limparFormulario();
                throw new Error("CEP não encontrado! Verifique e tente novamente.");
            }

            enderecoInfo.value = data.logradouro;
            bairroInfo.value = data.bairro;
            cidadeInfo.value = data.localidade;
            estadoInfo.value = `${data.estado} - ${data.uf}`;
        })
        .catch(error => {
            console.error("Erro ao buscar CEP:", error.message);
            alert(error.message);
        });
}