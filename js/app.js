import { Cliente, ClienteService } from "./classes.js";
import { criarElementoCliente } from "./utils.js";

const listaClientes = document.getElementById("clientesCadastrados");
const formulario = document.getElementById("formulario");

const apiUrl = "https://crudcrud.com/api/1ffa40825e374fa9b9ee10d57efba8f1/clientes";
const service = new ClienteService(apiUrl);

async function carregarClientes() {
    listaClientes.innerHTML = "";
    const clientes = await service.listar();

    clientes.map(cliente => {
        const item = criarElementoCliente(cliente, async (id, elemento) => {
            await service.excluir(id);
            elemento.remove();
        });
        listaClientes.appendChild(item);
    });
}


formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) return alert("Preencha todos os campos!");

    const novoCliente = new Cliente(nome, email);
    const clienteCriado = await service.criar(novoCliente);

    const item = criarElementoCliente(clienteCriado, async (id, elemento) => {
        await service.excluir(id);
        elemento.remove();
    });

    listaClientes.appendChild(item);

    formulario.reset();
});


carregarClientes();