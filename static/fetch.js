// inputs do formulário
const code = document.getElementById('codigo')
const exec = document.getElementById('exec')
// áreas do resultado
const state = document.getElementById('estado')
const result = document.getElementById('resultado')

// preenche as áreas de resultado
function showResult(resState, resValue) {
    state.textContent = resState
    result.textContent = resValue
}

// altera o padrão do form para usar o Fetch quando o usuário submeter o código
document.getElementById('form').onsubmit = function (event) {
    // não recarrega/redireciona a página
    event.preventDefault();

    // cria o formulário a ser enviado ao servidor
    let doexec = exec.checked;
    let data = new FormData();
    data.append("code", code.value)
    data.append("exec", doexec ? "1" : "0")

    // chamada ao servidor do Flask
    fetch(api_url, { // api_url é definido no primeiro script do index.html
        "method": 'POST',
        "body": data
    }).then(
        // recebe a resposta (res) do servidor em Flask
        (res) => {
            // analisa cada status http definido no servidor (405, 200, ou 400)
            switch (res.status) {
                case 405: // Method Not Allowed: O método recebido pelo servidor não foi um 'POST'
                    showResult('Erro 405', `POST não foi feito ao Servidor. \n${res.statusText}`);
                    break;
                case 400: // Bad Request: O eval no servidor lançou um erro ao ser executado
                    res.text().then(value => showResult('Erro de execução:', `Seu código em Python lançou a exceção: \n${value}`));
                    break;
                case 200: // OK: sucesso ao executar o código 
                    res.text().then(value => showResult(doexec ? 'Log:' : 'Resultado:', value));
                    break;
                default: // status não previsto pelo servidor
                    showResult(`Erro interno (${res.status})`, `Erro desconhecido pelo servidor: \n${res.statusText}`);
                    break;
            }
        },
        (reason) => showResult("Falha pós-POST:", reason)
    ).catch((reason) => showResult("Falha pré-POST:", reason))
}
