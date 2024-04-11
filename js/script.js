const calculatorDisplay = document.getElementById('calculatorDisplay');
const numbers = document.querySelectorAll('.numbers__button');
const operators = document.querySelectorAll('.operators__button');
const allClearButton = document.getElementById('allClear');
const plusMinusButton = document.getElementById('plusMinus');
const percentageButton = document.getElementById('percentage');
const equalsButton = document.getElementById('equals');

let currentNumber = '';
let operatorActive = false;
let selectedOperator;

function clearDisplay() {
    calculatorDisplay.textContent = '0';
    calculatorDisplay.style.fontSize = '86px';
    operatorActive = false;
}

function updateDisplay(value) {
    if (calculatorDisplay.textContent === '0' || operatorActive) {
        calculatorDisplay.textContent = '';
        operatorActive = false;
    }

    // If the entered value is a comma and there is no comma present yet
    if (value === ',' && calculatorDisplay.textContent.indexOf(',') === -1) {
        // If the display is empty, add a leading zero before the comma
        if (calculatorDisplay.textContent === '') {
            calculatorDisplay.textContent += '0' + value;
        } else {
            calculatorDisplay.textContent += value;
        }
    } else if (value !== ',') { // Exclude comma from adding to display length
        if (calculatorDisplay.textContent.length < 10) {
            calculatorDisplay.textContent += value;
        }
    }

    // Lower font size to 64px when the display reaches 6 characters
    if (calculatorDisplay.textContent.length === 7) {
        calculatorDisplay.style.fontSize = '64px';
    }
    if (calculatorDisplay.textContent.length === 9) {
        calculatorDisplay.style.fontSize = '54px';
    }
}




function calculateResult() {
    let result;
    const currentValue = parseFloat(currentNumber.replace(',', '.'));
    const enteredValue = parseFloat(calculatorDisplay.textContent.replace(',', '.'));

    switch (selectedOperator) {
        case '/':
            if (enteredValue !== 0) {
                result = currentValue / enteredValue;
            } else {
                calculatorDisplay.textContent = 'Error';
                return;
            }
            break;
        case '×':
            result = currentValue * enteredValue;
            break;
        case '-':
            result = currentValue - enteredValue;
            break;
        case '+':
            result = currentValue + enteredValue;
            break;
    }

    result = result.toString().replace('.', ','); 
    console.log(result);

    if (result.length > 10) {
        result = parseFloat(result).toExponential(2);
        calculatorDisplay.style.fontSize = '84px';
    }

    if (result.length === 7) {
        calculatorDisplay.style.fontSize = '64px';
    }
    if (result.length > 7 && result.length < 10) {
        calculatorDisplay.style.fontSize = '52px';
    }
    if (result.length === 10) {
        calculatorDisplay.style.fontSize = '48px';
    }

    calculatorDisplay.textContent = result;
}

clearDisplay();

numbers.forEach(number => {
    number.addEventListener('click', () => {
        updateDisplay(number.textContent);
    });
});

plusMinusButton.addEventListener('click', () => {
    calculatorDisplay.textContent = parseFloat(calculatorDisplay.textContent.replace(',', '.')) * -1;
});

percentageButton.addEventListener('click', () => {
    calculatorDisplay.textContent = parseFloat(calculatorDisplay.textContent.replace(',', '.')) / 100;
});

allClearButton.addEventListener('click', clearDisplay);

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operators.forEach(op => {
            if (op !== operator) {
                op.classList.remove('active');
            }
        });

        if (operator !== equalsButton) {
            operator.classList.add('active');
            currentNumber = calculatorDisplay.textContent;
            operatorActive = true;
            selectedOperator = operator.textContent;
        } else {
            calculateResult();
        }
    });
});
