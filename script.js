let currentInput = ""; // What is currently being typed
let historyInput = ""; // The "work" shown above the result

const resultDisplay = document.getElementById("result");
const historyDisplay = document.getElementById("history");

// Update the screen
function updateDisplay() {
    resultDisplay.innerText = currentInput || "0";
    historyDisplay.innerText = historyInput;
}

// Append numbers to the display
function appendNumber(number) {
    // Prevent multiple decimals in one number
    if (number === "." && currentInput.includes(".")) return;
    
    currentInput += number;
    updateDisplay();
}

// Append operators
function appendOperator(operator) {
    if (currentInput === "" && historyInput === "") return;
    
    // If user finished a calculation and wants to perform math on the result
    if (currentInput === "" && historyInput !== "") {
        historyInput = historyInput.slice(0, -1) + operator;
    } else {
        historyInput += currentInput + " " + operator + " ";
        currentInput = "";
    }
    updateDisplay();
}

// Delete the last character (Backspaced)
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// Clear everything
function clearAll() {
    currentInput = "";
    historyInput = "";
    updateDisplay();
}

// Perform the calculation
function calculate() {
    let fullExpression = historyInput + currentInput;
    
    if (fullExpression === "") return;

    try {
        // We use eval() here for simplicity. 
        // Note: In production apps with user-inputted text fields, be careful with eval.
        // But for a button-controlled calculator, it is safe.
        let calculation = eval(fullExpression.replace('×', '*').replace('÷', '/'));
        
        // Check for division by zero
        if (calculation === Infinity || isNaN(calculation)) {
            resultDisplay.innerText = "Error";
            currentInput = "";
            historyInput = "";
        } else {
            historyInput = fullExpression + " =";
            currentInput = calculation.toString();
            updateDisplay();
            // Reset history after calculation so the next number starts fresh
            historyInput = ""; 
        }
    } catch (error) {
        resultDisplay.innerText = "Error";
        currentInput = "";
        historyInput = "";
    }
}