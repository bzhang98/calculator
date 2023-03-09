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