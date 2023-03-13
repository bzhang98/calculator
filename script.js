const eval = {
    'add': (a, b) => Number(a) + Number(b),
    'subtract': (a, b) => Number(a) - Number(b),
    'multiply': (a, b) => Number(a) * Number(b),
    'divide': (a, b) => Number(a) / Number(b),
}

function evaluate(operator, a, b) {
    let answer;
    switch (operator) {
        case 'add':
            answer = eval.add(a, b);
            break;
        case 'subtract':
            answer = eval.subtract(a, b);
            break;
        case 'multiply':
            answer = eval.multiply(a, b);
            break;
        case 'divide':
            answer = eval.divide(a, b);
            break;
    }
    if (answer === Infinity || answer === NaN) answer = 'Undefined'
    return answer;
}

function updateDisplay(num1, num2) {
    input.textContent = answer;
    switch (currentOperator || lastOperator) {
        case 'add':
            expression.textContent = `${num1} + ${num2} = `
            break;
        case 'subtract':
            expression.textContent = `${num1} - ${num2} = `
            break;
        case 'multiply':
            expression.textContent = `${num1} x ${num2} = `
            break;
        case 'divide':
            expression.textContent = `${num1} ÷ ${num2} = `
            break;
    }
}

let input = document.querySelector('#input');
let expression = document.querySelector('#expression');

let answer = '';
let currentNum = '';
let lastNum = '';
let nextNum = '';
let currentOperator = '';
let lastOperator = '';


input.textContent = '0';

const numbers = Array.from(document.querySelectorAll('.number'));
for (let number of numbers) {
    number.addEventListener('click', () => {
        if (currentNum === 'Undefined' || currentNum.toString() === '0' || currentNum.toString() === answer.toString()) {
            currentNum = number.textContent;
            input.textContent = currentNum;
        } else {
            currentNum += number.textContent;
            input.textContent = currentNum;
        }

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
        if (!(currentNum === 'Undefined')) {
            if (currentNum && !lastNum) {
                currentOperator = operator.id;
                lastNum = currentNum;
                expression.textContent = `${lastNum} ${operator.textContent}`;
                currentNum = '';
            }
            

            if (currentNum && lastNum) {
                nextNum = currentNum;
                answer = evaluate(currentOperator, lastNum, currentNum);
                input.textContent = answer;
                expression.textContent = `${answer} ${operator.textContent}`;
                

                lastNum = answer;
                currentNum = '';
                currentOperator = operator.id;

            }
            
        }
    });
}

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (currentOperator) {
        lastOperator = currentOperator;
        answer = evaluate(currentOperator, lastNum, currentNum);
        updateDisplay(lastNum, currentNum);
        nextNum = currentNum;
        currentNum = answer;
        lastNum = '';
        currentOperator = '';
    } else {
        answer = evaluate(lastOperator, currentNum, nextNum);
        lastNum = currentNum;
        currentNum = answer;
        updateDisplay(lastNum, nextNum);
        lastNum = '';
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