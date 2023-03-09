function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
}

let displayValue = '';
const display = document.querySelector('#display')

const numbers = Array.from(document.querySelectorAll('.number'));
for(let number of numbers) {
    number.addEventListener('click', () => {
        displayValue += number.id;
        display.textContent = displayValue;
    });
}

const operators = Array.from(document.querySelectorAll('.operator'));
for(let operator of operators) {
    operator.addEventListener('click', () => {
        displayValue += ` ${operator.textContent} `;
        display.textContent = displayValue;
    });
}

const ac = document.querySelector('#clear');
ac.addEventListener('click', () => {
    displayValue = '';
    display.textContent = displayValue;
});