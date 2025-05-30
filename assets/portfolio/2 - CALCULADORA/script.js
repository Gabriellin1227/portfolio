const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentNumber = '';
let previousNumber = '';
let operation = '';

function updateDisplay(text) {
    display.textContent = text;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (value === 'C') {
            // Limpar tudo
            currentNumber = '';
            previousNumber = '';
            operation = '';
            updateDisplay('');
        } else if (value === 'CE') {
            // Limpar somente o número atual
            currentNumber = '';
            updateDisplay('');
        } else if (value === '<') {
            // Apagar último dígito do número atual
            currentNumber = currentNumber.slice(0, -1);
            updateDisplay(currentNumber);
        } else if (value === '=' && previousNumber && operation && currentNumber) {
            // Realizar o cálculo
            const result = calculate(Number(previousNumber), Number(currentNumber), operation);
            updateDisplay(result);
            currentNumber = result.toString();
            previousNumber = '';
            operation = '';
        } else if (['+', '-', 'x', '/'].includes(value)) {
            if (currentNumber !== '') {
                previousNumber = currentNumber;
                currentNumber = '';
                operation = value;
                updateDisplay('');
            }
        } else {
            // Número ou ponto
            if (value === '.' && currentNumber.includes('.')) return;
            currentNumber += value;
            updateDisplay(currentNumber);
        }
    });
});



function calculate(num1, num2, op) {
    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case 'x': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Erro';
        default: return 'Erro';
    }
}
