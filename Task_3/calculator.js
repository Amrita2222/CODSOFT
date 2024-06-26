
    // DOMContentLoaded does not wait for stylesheets to load
    document.addEventListener('DOMContentLoaded', function () {
        const display = document.getElementById('display');
        const buttons = Array.from(document.getElementsByClassName('btn_col'));
        let currentInput = '';
        let previousInput = '';
        let operator = '';
        let displayValue = '';
    
        // button Loops
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
    
                if (value === null) {
                    // Handle clear button
                    if (this.id === 'clear') {
                        currentInput = '';
                        previousInput = '';
                        operator = '';
                        displayValue = '';
                        display.textContent = '0';
                    } else if (this.id === 'equals') {
                        // Handle equals button
                        if (previousInput && currentInput && operator) {
                            currentInput = operate(previousInput, currentInput, operator);
                            displayValue = `${previousInput} ${operator} ${displayValue} = ${currentInput}`;
                            display.textContent = currentInput;
                            previousInput = '';
                            operator = '';
                        }
                    }
                } else {
                    // Handle number and operator buttons
                    if (this.classList.contains('operator')) {
                        if (currentInput) {
                            if (previousInput) {
                                currentInput = operate(previousInput, currentInput, operator);
                                displayValue = `${previousInput} ${operator} ${displayValue}`;
                                previousInput = currentInput;
                                display.textContent = displayValue;
                            }
                            operator = value;
                            previousInput = currentInput;
                            currentInput = '';
                            displayValue = `${previousInput} ${operator}`;
                        }
                    } else {
                        if (value === '.' && currentInput.includes('.')) return;
                        currentInput += value;
                        displayValue = `${previousInput} ${operator} ${currentInput}`.trim();
                    }
                    display.textContent = displayValue;
                }
            });
        });
    
        function operate(a, b, operator) {
            a = parseFloat(a);
            b = parseFloat(b);
            switch (operator) {
                case '+': return (a + b).toString();
                case '-': return (a - b).toString();
                case '*': return (a * b).toString();
                case '/': return (a / b).toString();
                default: return '';
            }
        }
    });
    
    