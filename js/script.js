const calculatorDisplay = document.getElementById('calculatorDisplay');
const numbers = document.querySelectorAll('.numbers__button');
const operators = document.querySelectorAll('.operators__button');
const allClearButton = document.getElementById('allClear');
const plusMinusButton = document.getElementById('plusMinus');
const commaButton = document.getElementById('comma');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const subtractButton = document.getElementById('subtract');
const addButton = document.getElementById('add');
const equalsButton = document.getElementById('equals');

var number = '';

function clearDisplay() {
    console.log('cleared display');
    calculatorDisplay.textContent = '0';
    calculatorDisplay.style.fontSize = '86px';

    operators.forEach(operator => {
        operator.style.backgroundColor = '#ff9f09';
        operator.style.color = 'white';
    });
}

function saveNumber() {
    console.log('saved number: ' + calculatorDisplay.textContent);
    number = parseFloat(calculatorDisplay.textContent);
    calculatorDisplay.textContent = '0';
    return number;
}

clearDisplay();

numbers.forEach(number => {
    number.addEventListener('click', () => {
        console.log('number clicked: ' + number.textContent)
        if (calculatorDisplay.textContent === '0') {
            calculatorDisplay.textContent = number.textContent;
        } else if (calculatorDisplay.textContent.length < 11) {
            if (calculatorDisplay.textContent.length === 6) {
                calculatorDisplay.style.fontSize = '64px';
            }

            if (calculatorDisplay.textContent.length === 8) {
                calculatorDisplay.style.fontSize = '48px';
            }

            calculatorDisplay.textContent += number.textContent;
        }
    });
});

allClearButton.addEventListener('click', clearDisplay);

let selectedOperator;

operators.forEach(operator => {
    operator.addEventListener('click', () => {

        operators.forEach(op => {
            if(op !== operator) {
                op.style.backgroundColor = '#ff9f09';
                op.style.color = 'white';
            }
        });

        if (operator !== equalsButton) {
            number = saveNumber();
            calculatorDisplay.style.fontSize = '86px';
            selectedOperator = operator.textContent;
            operator.style.backgroundColor = 'white';
            operator.style.color = 'black';
        }

    });
});


equalsButton.addEventListener('click', () => {
    const currentValue = parseFloat(calculatorDisplay.textContent);
    let result;
    
    switch (selectedOperator) {
        case '/':
            result = parseFloat(number / currentValue);
            break;
        case '×':
            result = parseFloat(number * currentValue);
            break;
        case '-':
            result = parseFloat(number - currentValue);
            break;
        case '+':
            result = parseFloat(number + currentValue);
            break;
    }

    // Check if the result is too long
    if (calculatorDisplay.textContent.length > 10) {
        clearDisplay();
        calculatorDisplay.textContent = 'Error';
    }

    // Check if the result is a whole number
    if (result % 1 !== 0) {
        calculatorDisplay.textContent = result.toFixed(2);
    } else {
        calculatorDisplay.textContent = result;
    }
    
});
