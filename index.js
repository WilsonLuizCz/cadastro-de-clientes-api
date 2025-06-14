const clientes = document.getElementById("clientesCadastrados");
const apiUrl = "https://crudcrud.com/api/ed48b4761ee34fb899c1221b528acbd1/clientes";

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

// Evento de envio via submit (formulário)
document.getElementById("formulario").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página

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