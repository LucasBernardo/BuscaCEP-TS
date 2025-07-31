# BuscaCEP-TS

Este projeto permite buscar informações de endereço a partir de um CEP utilizando a [API ViaCEP](https://viacep.com.br/). O usuário insere um CEP válido e recebe os dados da localização correspondente.

## Tecnologias Utilizadas

- **HTML5** – estrutura da interface.
- **Bootstrap 5** – estilização responsiva e moderna.
- **TypeScript** – lógica da aplicação.
- **JavaScript** – código gerado a partir do TypeScript (transpilado).

## Como Funciona

1. O usuário digita um CEP no campo de entrada.
2. O sistema faz uma requisição à API ViaCEP.
3. Os dados retornados (logradouro, bairro, cidade, estado, etc.) são exibidos dinamicamente na tela.

## Execução e Transpilação

O projeto é escrito em **TypeScript** e deve ser **transpilado** para **JavaScript** antes da execução no navegador.

### Passos para rodar o projeto:

1. Certifique-se de ter o **Node.js** instalado em sua máquina.
2. Instale o TypeScript globalmente (caso ainda não tenha):
   ```bash
   npm install -g typescript

3. Transpile o código TypeScript (.ts) para JavaScript:
   Use o comando npm run start, Isso gerará um arquivo js na mesma pasta (e subpastas), que será utilizado no HTML.

4. Abra o arquivo index.html em um navegador para testar o projeto.

API Utilizada
https://viacep.com.br/ws/{cep}/json/
