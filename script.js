const eval = {
    'add': (a, b) => Number(a) + Number(b),
    'subtract': (a, b) => Number(a) - Number(b),
    'multiply': (a, b) => Number(a) * Number(b),
    'divide': (a, b) => Number(a) / Number(b),
}

function evaluate(operator, a, b) {
    switch (operator) {
        case 'add':
            return eval.add(a, b);
        case 'subtract':
            return eval.subtract(a, b);
        case 'multiply':
            return eval.multiply(a, b);
        case 'divide':
            return eval.divide(a, b);
    }
}

function updateDisplay() {
    answer = evaluate(currentOperator, lastNum, currentNum);
    input.textContent = answer;
    switch (currentOperator) {
        case 'add':
            expression.textContent = `${lastNum} + ${currentNum} = `
            break;
        case 'subtract':
            expression.textContent = `${lastNum} - ${currentNum} = `
            break;
        case 'multiply':
            expression.textContent = `${lastNum} x ${currentNum} = `
            break;
        case 'divide':
            expression.textContent = `${lastNum} ÷ ${currentNum} = `
            break;
    }
    currentNum = answer;
    lastNum = '';
    currentOperator = '';
}

let input = document.querySelector('#input');
let expression = document.querySelector('#expression');

//let inputValue = '0';
let currentNum = '';
let answer = '';
let lastNum = '';
let currentOperator = '';

input.textContent = '0';

const numbers = Array.from(document.querySelectorAll('.number'));
for (let number of numbers) {
    number.addEventListener('click', () => {
        currentNum += number.textContent;
        input.textContent = currentNum;
    });
}

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => {
    if (!currentNum.includes('.')) {
        currentNum += decimal.textContent;
        input.textContent = currentNum;
    }
});

const operators = Array.from(document.querySelectorAll('.operator'));
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (currentNum && lastNum) {
            updateDisplay();
        }
        currentOperator = operator.id;
        if (currentNum && !lastNum) lastNum = currentNum;

        expression.textContent = `${lastNum} ${operator.textContent} = `
        currentNum = '';
    });
}

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (currentOperator) {
        updateDisplay();
    }
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    if (clear.textContent === 'AC') {
        currentNum = '';
        answer = '';
        lastNum = '';
        currentOperator = '';
        input.textContent = '0';
        expression.textContent = '';
    } else if (clear.textContent === 'C') {
        currentNum = '';
    }
});




/* window.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        if (!parameters.displayingAnswer) {
            displayValue += e.key;
        } else {
            displayValue = e.key
            parameters.displayingAnswer = false;
        }
        parameters.canInputOperator = true;
        display.textContent = displayValue;
    }

    if (parameters.canInputOperator) {
        switch (e.key) {
            case '+':
            case '-':
                displayValue += ` ${e.key} `;
                display.textContent = displayValue;
                parameters.displayingAnswer = false;
                parameters.decimalInNum = false;
                break;
            case '/':
                displayValue += ' ÷ ';
                display.textContent = displayValue;
                parameters.displayingAnswer = false;
                parameters.decimalInNum = false;
                break;
            case '*':
                displayValue += ' x ';
                display.textContent = displayValue;
                parameters.displayingAnswer = false;
                parameters.decimalInNum = false;
                break;
        }
        parameters.canInputOperator = false;
    }

    switch (e.key) {
        case '.':
            if (!parameters.decimalInNum) {
                displayValue += e.key;
                display.textContent = displayValue;
                parameters.displayingAnswer = false;
                parameters.decimalInNum = true;
            }
            break;
        case 'Enter':
            e.preventDefault();
            lastExpression.textContent = `${displayValue} =`;
            displayValue = evaluate(displayValue);
            display.textContent = displayValue;
            parameters.displayingAnswer = true;
            parameters.decimalInNum = false;
            answerLength = displayValue.toString().length;
            break;
        case 'Backspace':
            if (!displayingAnswer && displayValue.length > answerLength) {
                switch (displayValue.slice(-3)) {
                    case ' + ':
                    case ' - ':
                    case ' ÷ ':
                        displayValue = displayValue.slice(0, -3);
                        break;
                    default:
                        displayValue = displayValue.slice(0, -1);
                        break;
                }
                display.textContent = displayValue;
            }
            break;
    }
}); */