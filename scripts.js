const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('#display');
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', event => {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!key.matches('button')) return;

    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        } else if (previousKeyType === 'operator') {
            display.textContent = '0.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
        display.textContent = '0';
        calculator.dataset.previousKeyType = 'clear';
    }

    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
        calculator.dataset.previousKeyType = 'operator';
    }

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        display.textContent = calculate(firstValue, operator, secondValue);
        calculator.dataset.previousKeyType = 'calculate';
    }
});

function calculate(first, operator, second) {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}
