// Criar nova tarefa
function criarTarefa() {
    const input = document.getElementById("taskInput");
    const titulo = input.value.trim();

    if (titulo === "") return; // Se estiver vazio, não faz nada

    const descricao = prompt("Digite a descrição da tarefa:") || "";

    const id = "card-" + Date.now();
    const card = criarElementoCard(id, titulo, descricao);

    document.querySelector("#em-aberto .card-container").appendChild(card);
    input.value = ""; // Limpa o input

    salvarTarefas();
}

// criar os cards
function criarElementoCard(id, titulo, descricao) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = id;
    card.draggable = true;
    card.ondragstart = iniciarArraste;

    // Título
    const tituloEl = document.createElement("h3");
    tituloEl.innerText = titulo;
    card.appendChild(tituloEl);

    //Descrição
    const descEl = document.createElement("p");
    descEl.className = "desc";
    descEl.innerText = descricao;
    card.appendChild(descEl);

    // Botão editar descrição
    const btnEditar = document.createElement("button");
    btnEditar.className = "desc-btn";
    btnEditar.innerText = "🪶 alterar descrição";
    btnEditar.onclick = () => editarDescricao(card);
    card.appendChild(btnEditar);

    // Botão remover
    const btnRemover = document.createElement("button");
    btnRemover.className = "remove-btn";
    btnRemover.innerText = "❌ remover tarefa";
    btnRemover.onclick = () => {
        card.remove();
        salvarTarefas();
    };
    card.appendChild(btnRemover);

    return card;
}


function permitirSoltar(evento) {
    evento.preventDefault();
}


function iniciarArraste(evento) {
    evento.dataTransfer.setData("text/plain", evento.target.id);
}

// Soltar na coluna
function soltarNaColuna(evento, coluna) {
    evento.preventDefault();
    const idCard = evento.dataTransfer.getData("text/plain");
    const card = document.getElementById(idCard);

    coluna.querySelector(".card-container").appendChild(card);
    salvarTarefas();
}

// Configura drag e drop nas colunas
document.querySelectorAll(".coluna").forEach(coluna => {
    coluna.addEventListener("dragover", permitirSoltar);
    coluna.addEventListener("drop", evento => soltarNaColuna(evento, coluna));
});

// Editar descrição
function editarDescricao(card) {
    const descAtual = card.querySelector(".desc").innerText;
    const novaDesc = prompt("Digite a nova descrição:", descAtual);

    if (novaDesc !== null) {
        card.querySelector(".desc").innerText = novaDesc;
        salvarTarefas();
    }
}

// Salvar
function salvarTarefas() {
    const dados = {};

    document.querySelectorAll(".coluna").forEach(coluna => {
        const id = coluna.id;
        const cards = Array.from(coluna.querySelectorAll(".card")).map(card => ({
            id: card.id,
            titulo: card.querySelector("h3").innerText,
            descricao: card.querySelector(".desc").innerText
        }));

        dados[id] = cards;
    });

    localStorage.setItem("kanban-tarefas", JSON.stringify(dados));
}

// Carregar tarefas salvas 
function carregarTarefasSalvas() {
    const dados = JSON.parse(localStorage.getItem("kanban-tarefas"));
    if (!dados) return;

    Object.keys(dados).forEach(idColuna => {
        const container = document.querySelector(`#${idColuna} .card-container`);
        if (!container) return;

        dados[idColuna].forEach(card => {
            const elementoCard = criarElementoCard(card.id, card.titulo, card.descricao);
            container.appendChild(elementoCard);
        });
    });
}

// load qnd carregar a pagina
document.addEventListener("DOMContentLoaded", carregarTarefasSalvas);
