const clientes = document.getElementById("clientesCadastrados");
const apiUrl = "https://crudcrud.com/api/312ae47e1373408799ba1a91ac8123e3/clientes";

// Função para criar item na tela
function adicionarClienteNaTela(cliente) {
    const item = document.createElement("li");
    item.innerHTML = `${cliente.nome} - ${cliente.email} <button class="b2">Excluir</button>`;
    
    // Botão de excluir
    const btn = item.querySelector("button");
    btn.addEventListener("click", () => {
        fetch(`${apiUrl}/${cliente._id}`, {
            method: "DELETE"
        }).then(() => {
            item.remove();
        });
    });

    clientes.appendChild(item);
}

// Carrega clientes ao iniciar
fetch(apiUrl)
    .then(resposta => resposta.json())
    .then(clientesCadastrados => {
        clientesCadastrados.forEach(cliente => {
            adicionarClienteNaTela(cliente);
        });
    });

// Evento de envio
document.getElementById("enviar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then(resposta => resposta.json())
    .then(cliente => {
        adicionarClienteNaTela(cliente);
        // Limpa os campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    });
});
