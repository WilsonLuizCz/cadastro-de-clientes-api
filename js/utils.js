export function criarElementoCliente(cliente, onDelete) {
    const item = document.createElement("li");
    item.innerHTML = `
        ${cliente.nome} - ${cliente.email}
        <button class="b2">Excluir</button>
    `;

    const btn = item.querySelector("button");
    btn.addEventListener("click", () => onDelete(cliente._id, item));

    return item;
}