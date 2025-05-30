// Valores iniciais
let saldo = 0;
let entradas = 0;
let saidas = 0;
let transacoes = [];

// Seletores principais
const saldoEl = document.querySelector('.amount');
const entradasEl = document.querySelector('.inflow span');
const saidasEl = document.querySelector('.outflow span');
const listaTransacoes = document.querySelector('.last-transactions p');

// ▶Abrir modal PIX
function abrirPix() {
    document.getElementById('modal-pix').style.display = 'flex';
}

// Fechar modal PIX
function fecharPix() {
    document.getElementById('modal-pix').style.display = 'none';
}

// Alternar abas PIX
function abrirTab(tab) {
    const btnReceber = document.getElementById('btn-receber');
    const btnTransferir = document.getElementById('btn-transferir');
    const formReceber = document.getElementById('form-receber');
    const formTransferir = document.getElementById('form-transferir');

    if (tab === 'receber') {
        btnReceber.classList.add('active');
        btnTransferir.classList.remove('active');
        formReceber.classList.add('active');
        formTransferir.classList.remove('active');
    } else {
        btnReceber.classList.remove('active');
        btnTransferir.classList.add('active');
        formReceber.classList.remove('active');
        formTransferir.classList.add('active');
    }
}

// Receber PIX
function receberPix() {
    const cpf = document.getElementById('cpf-receber').value.trim();
    const valor = parseFloat(document.getElementById('valor-receber').value.trim());

    if (!cpf || isNaN(valor) || valor <= 0) {
        alert('Todos os campos devem ser preenchidos corretamente!');
        return;
    }

    saldo += valor;
    entradas += valor;
    gerarTransacao('entrada', 'Transferência recebida', valor, cpf);
    atualizarTela();

    alert('Transação realizada com sucesso!');

    document.getElementById('cpf-receber').value = '';
    document.getElementById('valor-receber').value = '';
    fecharPix();
}

// Transferir PIX
function transferirPix() {
    const chave = document.getElementById('chave-transferir').value.trim();
    const valor = parseFloat(document.getElementById('valor-transferir').value.trim());

    if (!chave || isNaN(valor) || valor <= 0) {
        alert('Todos os campos devem ser preenchidos corretamente!');
        return;
    }

    if (valor > saldo) {
        alert('Saldo insuficiente!');
        return;
    }

    saldo -= valor;
    saidas += valor;
    gerarTransacao('saida', 'Transferência enviada', valor, chave);
    atualizarTela();
    

    alert('Transação realizada com sucesso!');

    document.getElementById('chave-transferir').value = '';
    document.getElementById('valor-transferir').value = '';
    fecharPix();
}

// Atualizar valores na tela
function atualizarTela() {
    saldoEl.innerText = formatarValor(saldo);
    entradasEl.innerText = formatarValor(entradas);
    saidasEl.innerText = formatarValor(saidas);

    if (transacoes.length === 0) {
        listaTransacoes.innerHTML = 'Não constam transações.';
    } else {
        listaTransacoes.innerHTML = '';
        transacoes.slice().reverse().forEach(tx => {
            const item = document.createElement('div');
            item.classList.add('item-transacao');
            item.classList.add(tx.titulo.toLowerCase() === 'entrada' ? 'entrada' : 'saida');

            item.innerHTML = `
                <div class="info">
                    <strong>${tx.titulo}</strong>
                    <span>${tx.tipo}</span>
                    <span>${tx.data}</span>
                    <span>Identificador: ${tx.identificador}</span>
                </div>
                <div class="valor">${formatarValor(tx.valor)}</div>
                <div class="id">ID: ${tx.id}</div>
            `;
            listaTransacoes.appendChild(item);
        });
    }
}


// Gerar comprovante de transação
function gerarTransacao(tipo, titulo, valor, identificador) {
    const agora = new Date();
    const data = agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();
    const id = `${agora.getFullYear()}${(agora.getMonth()+1).toString().padStart(2, '0')}${agora.getDate().toString().padStart(2, '0')}${agora.getHours().toString().padStart(2, '0')}${agora.getMinutes().toString().padStart(2, '0')}${agora.getSeconds().toString().padStart(2, '0')}`;

    const tx = {
        titulo: tipo === 'entrada' ? 'Entrada' : 'Saída',
        tipo: titulo,
        data: data,
        valor: valor,
        id: id,
        identificador: identificador
    };

    transacoes.push(tx);
}

// Formatar valores
function formatarValor(valor) {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}