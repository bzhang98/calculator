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
            currentOperator = operator.id;
            expression.textContent = `${lastNum} ${operator.textContent}`;
        }
    });
}

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (currentNum && lastNum || currentNum && nextNum) {
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

window.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        if (currentNum === 'Undefined' || currentNum.toString() === '0' || currentNum.toString() === answer.toString()) {
            currentNum = e.key;
            input.textContent = currentNum;
        } else {
            currentNum += e.key;
            input.textContent = currentNum;
        }
    }
});