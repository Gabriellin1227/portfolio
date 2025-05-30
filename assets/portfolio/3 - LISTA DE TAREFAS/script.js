const tarefaInput = document.getElementById('tarefaInput');
const tarefaArea = document.getElementById('tarefaArea');

function adicionarTarefa(){

    if(tarefaInput.value.trim() === ''){
        alert('Preencha o campo para adicionar uma nova tarefa!');
        return;
    }

    else{
        const novaDiv = document.createElement('div');
        const btnRemover = document.createElement('button');
        
        novaDiv.textContent = tarefaInput.value;
        btnRemover.textContent = 'Apagar';

        const idDaDiv = Date.now()
        
        btnRemover.addEventListener('click', () => removerTarefa(idDaDiv));
        
        novaDiv.setAttribute('id', idDaDiv)
        
        novaDiv.appendChild(btnRemover)
        tarefaArea.appendChild(novaDiv)
    }
}

function removerTarefa(x){
    let tarefaApagada = document.getElementById(x)
    tarefaApagada.remove()
}