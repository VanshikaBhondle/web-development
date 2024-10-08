document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentOperand = '';
    let previousOperand = '';
    let operator = '+,/,*.-';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const num = button.getAttribute('data-num');
            const op = button.getAttribute('data-op');

            if (num) {
                if (display.innerText === '0') {
                    display.innerText = num;
                } else {
                    display.innerText += num;
                }
                currentOperand += num;
            }

            if (op) {
                if (currentOperand === '' && previousOperand !== '') {
                    operator = op;
                } else if (currentOperand !== '') {
                    if (previousOperand === '') {
                        previousOperand = currentOperand;
                    } else {
                        previousOperand = operate(operator, previousOperand, currentOperand);
                    }
                    operator = op;
                    currentOperand = '';
                    display.innerText = previousOperand;
                }
            }

            if (button.id === 'equals') {
                if (currentOperand !== '' && operator !== '') {
                    display.innerText = operate(operator, previousOperand, currentOperand);
                    currentOperand = display.innerText;
                    previousOperand = '';
                    operator = '';
                }
            }

            if (button.id === 'clear') {
                currentOperand = '';
                previousOperand = '';
                operator = '';
                display.innerText = '0';
            }
        });
    });

    function operate(op, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (op === '+') return a + b;
        if (op === '-') return a - b;
        if (op === '*') return a * b;
        if (op === '/') return a / b;
        return b;
    }
});