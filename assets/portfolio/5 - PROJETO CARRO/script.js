// definindo de variaveis
let carroSelecionado = null;
let display = document.getElementById('result');
let bodyStyle = document.body.style;
let carroDiv = document.getElementsByClassName('container')[0];

let carroVermelho = document.getElementById('red')
let botaoVermelho = document.getElementById('vermelho')

let carroBranco = document.getElementById('white')
let botaoBranco = document.getElementById('branco')

let btnAcelerar = document.getElementById('acelerar')
let btnDesacelerar = document.getElementById('desacelerar')
let btnResetar = document.getElementById('resetar')

// Mudança da pagina e seleção de carros

function mostrarBtnInfeiror(){
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('btn')[i].style.display = 'block';
    }
}

function esconderBtnInferior(){
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('btn')[i].style.display = 'none ';
    }
}

function selecionarCarro(cor){
    mostrarBtnInfeiror()
    if(cor === 'vermelho'){
        display.textContent = 'Vermelho';
        bodyStyle.backgroundColor = 'red';
        bodyStyle.color = 'white';
        carroDiv.style.border = '1px solid white';
        carroSelecionado = carroVermelho;
    }
    if(cor === 'branco'){
        display.textContent = 'Branco';
        bodyStyle.backgroundColor = 'white';
        bodyStyle.color = 'black';
        carroDiv.style.border = '1px solid black';
        carroSelecionado = carroBranco;
    }
}

carroVermelho.addEventListener('click', function(){
    selecionarCarro('vermelho');
})

botaoVermelho.addEventListener('click', function(){
    selecionarCarro('vermelho');
})

carroBranco.addEventListener('click', function(){
    selecionarCarro('branco');
})

botaoBranco.addEventListener('click', function(){
    selecionarCarro('branco');
})

// movimento dos carros 

let redTamanhoAtual = parseInt(window.getComputedStyle(carroVermelho).width, 10);
let redTopAtual = parseInt(window.getComputedStyle(carroVermelho).top, 10);
let redRightAtual = parseInt(window.getComputedStyle(carroVermelho).right, 10);

let whiteTamanhoAtual = parseInt(window.getComputedStyle(carroBranco).width, 10);
let whiteTopAtual = parseInt(window.getComputedStyle(carroBranco).top, 10);
let whiteLeftAtual = parseInt(window.getComputedStyle(carroBranco).left, 10);

function acelerarCarro(){
    if ((carroSelecionado === carroVermelho) && (redTamanhoAtual > 25)){
        if (redTamanhoAtual <= 50){
            redTamanhoAtual -= 5;
            redTopAtual -= 8;
            redRightAtual += 7;
        }

        if (redTamanhoAtual > 50){
            redTamanhoAtual -= 2;
            redTopAtual -= 3;
            redRightAtual += 1;
        }

        carroVermelho.style.width = redTamanhoAtual + 'px';
        carroVermelho.style.top = redTopAtual + 'px';
        carroVermelho.style.right = redRightAtual + 'px';
    }
    
    if ((carroSelecionado === carroBranco) && (whiteTamanhoAtual > 25)){
        if (whiteTamanhoAtual <= 50){
            whiteTamanhoAtual -= 5;
            whiteTopAtual -= 8;
            whiteLeftAtual += 7;
        }

        if (whiteTamanhoAtual > 50){
            whiteTamanhoAtual -= 2;
            whiteTopAtual -= 3;
            whiteLeftAtual += 1;
        }

        carroBranco.style.width = whiteTamanhoAtual + 'px';
        carroBranco.style.top = whiteTopAtual + 'px';
        carroBranco.style.left = whiteLeftAtual + 'px';
    }
}

function desacelerarCarro(){
    if ((carroSelecionado === carroVermelho) && (redTamanhoAtual < 60)){
        if (redTamanhoAtual >= 50){
            redTamanhoAtual += 2;
            redTopAtual += 3;
            redRightAtual -= 1;
        }
        if (redTamanhoAtual < 50){
            redTamanhoAtual += 5;
            redTopAtual += 8;
            redRightAtual -= 7;
        }
        carroVermelho.style.width = redTamanhoAtual + 'px';
        carroVermelho.style.top = redTopAtual + 'px';   
        carroVermelho.style.right = redRightAtual + 'px';   
    }
    if ((carroSelecionado === carroBranco) && (whiteTamanhoAtual < 60)){
        if (whiteTamanhoAtual >= 50){
            whiteTamanhoAtual += 2;
            whiteTopAtual += 3;
            whiteLeftAtual -= 1;
        }
        if (whiteTamanhoAtual < 50){
            whiteTamanhoAtual += 5;
            whiteTopAtual += 8;
            whiteLeftAtual -= 7;
        }
        carroBranco.style.width = whiteTamanhoAtual + 'px';
        carroBranco.style.top = whiteTopAtual + 'px';   
        carroBranco.style.left = whiteLeftAtual + 'px';   
        
    }
}
btnAcelerar.addEventListener('click', function(){
    acelerarCarro();
})
btnDesacelerar.addEventListener('click', function(){
    desacelerarCarro();
})

document.addEventListener('keydown', function(event){
    switch(event.key){
        case 'ArrowUp':
            acelerarCarro();
            break;
        case 'ArrowDown':
            desacelerarCarro();
            break;
    }
});

btnResetar.addEventListener('click', function(){
        display.textContent = '?';
        bodyStyle.backgroundColor = 'black';
        bodyStyle.color = 'white';
        carroDiv.style.border = '1px solid white';
        carroSelecionado = null;
        esconderBtnInferior();
        carroVermelho.style = null;
        carroBranco.style = null;
        redTamanhoAtual = parseInt(window.getComputedStyle(carroVermelho).width, 10);
        redTopAtual = parseInt(window.getComputedStyle(carroVermelho).top, 10);
        redRightAtual = parseInt(window.getComputedStyle(carroVermelho).right, 10);      
        whiteTamanhoAtual = parseInt(window.getComputedStyle(carroBranco).width, 10);
        whiteTopAtual = parseInt(window.getComputedStyle(carroBranco).top, 10);
        whiteLeftAtual = parseInt(window.getComputedStyle(carroBranco).left, 10);
})