const eval = {
    'add': (a, b) => a + b,
    'subtract': (a, b) => a - b,
    'multiply': (a, b) => a * b,
    'divide': (a, b) => a / b,
}

//Takes an expression (e.g. "1 + 2 * 3") and splits the string into an array by the space character yielding [1, '+', 2, '*', 3]
//While the array contains an operator (+, -, ÷, or x), evaluates the expression of that portion of the array
//and returns a new array with the result of that expression
//(e.g. [1, '+', 2, '*', 3] will first evaluate 2 * 3 and return [1, '+', 6] then evaluate 1 + 6 and return [7]
function evaluate(expression) {
    let parts = expression.split(' ').map(part => !isNaN(part) ? Number(part) : part);
    while (parts.includes('x')) {
        let multiplyLocation = parts.indexOf('x');
        let evalMultiply = eval.multiply(parts[multiplyLocation - 1], parts[multiplyLocation + 1]);
        parts.splice(multiplyLocation - 1, 3, evalMultiply);
    }
    while (parts.includes('÷')) {
        let divideLocation = parts.indexOf('÷');
        let evalDivide = eval.divide(parts[divideLocation - 1], parts[divideLocation + 1]);
        parts.splice(divideLocation - 1, 3, evalDivide);
    }

    while (parts.includes('+')) {
        let addLocation = parts.indexOf('+');
        let evalAdd = eval.add(parts[addLocation - 1], parts[addLocation + 1]);
        parts.splice(addLocation - 1, 3, evalAdd);
    }

    while (parts.includes('-')) {
        let subtractLocation = parts.indexOf('-');
        let evalSubtract = eval.subtract(parts[subtractLocation - 1], parts[subtractLocation + 1]);
        parts.splice(subtractLocation - 1, 3, evalSubtract);
    }
    return parts[0];
}

//Updates the display
//The first parameter is a boolean for whether the display should be appended or replaced by the expression
//The second parameter is the character or string which is being added to the expression
function updateDisplay(append, char) {
    if (append) {
        expression += char;
        displayValue = expression;
        input.textContent = displayValue;
    } else {
        expression = char;
        displayValue = expression;
        input.textContent = displayValue;
    }
}

let displayValue = '';
let answer = '';
let expression = '';
const input = document.querySelector('#input');
const lastExpression = document.querySelector('#evaluated-expression');

const numbers = Array.from(document.querySelectorAll('.number'));
for (let number of numbers) {
    number.addEventListener('click', () => {
        if (expression === answer || expression.toString() === '0') {
            updateDisplay(false, number.textContent)
        } else {
            updateDisplay(true, number.textContent)
        }
    });
}

const decimal = {
    decimalButton: document.querySelector('#decimal'),
    updateDecimal: function () {
        updateDisplay(true, decimal.decimalButton.textContent);
        decimal.disable();
    },
    enable: function () {
        this.decimalButton.addEventListener('click', this.updateDecimal);
    },
    disable: function () {
        this.decimalButton.removeEventListener('click', this.updateDecimal);
    }
};

window.onload = decimal.enable();

const operators = Array.from(document.querySelectorAll('.operator'));
for (let operator of operators) {
    operator.addEventListener('click', () => {
        const conditions = ['+', '-', 'x', '÷']
        if (conditions.some(el => expression.toString().slice(-2).includes(el))) {
            let newExpression = `${expression.slice(0, -3)} ${operator.textContent} `;
            updateDisplay(false, newExpression);
            decimal.disable();
            decimal.enable();
        } else {
            updateDisplay(true, ` ${operator.textContent} `)
            decimal.disable();
            decimal.enable();
        }
    });
}

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    answer = evaluate(expression);
    lastExpression.textContent = `${expression} =`;
    updateDisplay(false, answer);
    if (!answer.toString().includes('.')) {
        decimal.disable();
        decimal.enable();
    }
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    answer = '';
    updateDisplay(false, '0');
    lastExpression.textContent = '';
    decimal.disable();
    decimal.enable();
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