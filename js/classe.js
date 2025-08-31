export class Cliente {
    constructor(nome, email, id = null) {
        this.nome = nome;
        this.email = email;
        this._id = id; 
    }
}

export class ClienteService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async listar() {
        const resposta = await fetch(this.apiUrl);
        return resposta.json();
    }

    async criar(cliente) {
        const resposta = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });
        return resposta.json();
    }

    async excluir(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
    }
}