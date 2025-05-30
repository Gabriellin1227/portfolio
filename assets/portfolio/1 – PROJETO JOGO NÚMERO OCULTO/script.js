
let numeroOculto;
let tentativasRestantes = 5;
let jogoAtivo = false;

function definirNumeroOculto() {
    const input = document.getElementById('numeroOcultoInput');
    const valor = Number(input.value);

    if (valor >= 1 && valor <= 100) {
        numeroOculto = valor;
        jogoAtivo = true;

        document.getElementById('ocultar-numero').style.display = 'none';
        document.getElementById('adivinhar-numero').style.display = 'block';
    } else {
        alert('Digite um número entre 1 e 100.');
    }
}

document.getElementById('numeroOcultoInput').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function verificarChute() {
    if (!jogoAtivo) return;

    const chute = Number(document.getElementById('chuteInput').value);
    const mensagem = document.getElementById('mensagem');

    if (isNaN(chute) || chute < 1 || chute > 100) {
        alert('Digite um número válido entre 1 e 100.');
        return;
    }

    if (chute === numeroOculto) {
        mensagem.textContent = 'Parabéns! Você acertou o número!';
        encerrarJogo();
    } else {
        tentativasRestantes--;
        document.getElementById('tentativasRestantes').textContent = tentativasRestantes;

        if (tentativasRestantes === 0) {
            mensagem.textContent = `Fim de jogo! O número era ${numeroOculto}.`;
            encerrarJogo();
        } else {
            const dica = chute > numeroOculto ? 'menor' : 'maior';
            mensagem.textContent = `Errou! Tente um número ${dica}.`;
        }
    }

    document.getElementById('chuteInput').value = '';
    document.getElementById('chuteInput').focus();
}

function encerrarJogo() {
    jogoAtivo = false;
    document.getElementById('reiniciarBtn').style.display = 'inline-block';
}

function reiniciarJogo() {
    numeroOculto = null;
    tentativasRestantes = 5;
    jogoAtivo = false;

    document.getElementById('numeroOcultoInput').value = '';
    document.getElementById('chuteInput').value = '';
    document.getElementById('mensagem').textContent = '';
    document.getElementById('tentativasRestantes').textContent = tentativasRestantes;

    document.getElementById('ocultar-numero').style.display = 'block';
    document.getElementById('adivinhar-numero').style.display = 'none';
    document.getElementById('reiniciarBtn').style.display = 'none';
}