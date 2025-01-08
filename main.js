const switchMode = document.querySelector(".icon-button");
const calculator = document.querySelector(".calculator");
const icon = document.querySelector(".icon");
const equal = document.querySelector(".equals");
const calculatorNumbers = document.querySelector(".calculator-buttons");
const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator")
const iconButton = document.querySelector(".button")

// switch color theme

function switchToDarkMood() {
    icon.src = "imgs/sun.svg";
    document.body.style.backgroundColor = "#000";
    calculator.classList.add("calculator-dark");
    icon.classList.add("icon-dark");
    equal.classList.add("equals-dark");
    calculatorNumbers.classList.add("calculator-buttons-dark");
    buttons.forEach(element => {
        element.classList.add("button-dark")
    });
    operators.forEach(element => {
        element.classList.add("operator-dark")
    });
    localStorage.clear();
    localStorage.setItem("theme", "dark");
}

if (localStorage.getItem("theme") === "dark") {
    switchToDarkMood();
}

switchMode.addEventListener("click", () => {
    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", "light");
    }
    if (localStorage.getItem("theme") === "light") {
        switchToDarkMood();
    } else if (localStorage.getItem("theme") === "dark") {
        icon.src = "imgs/moon-stars.svg";
        document.body.style.backgroundColor = "#bdbdbd";
        calculator.classList.remove("calculator-dark");
        icon.classList.remove("icon-dark");
        equal.classList.remove("equals-dark");
        calculatorNumbers.classList.remove("calculator-buttons-dark");
        buttons.forEach(element => {
            element.classList.remove("button-dark");
        });
        operators.forEach(element => {
            element.classList.remove("operator-dark");
        });

        localStorage.clear();
        localStorage.setItem("theme", "light");

    }
});

// display the content

const displayed = document.querySelector(".calculator-display");

function displayElement(element) {
    displayed.textContent += element.textContent;
}

// an object has the operations availble on the calculator and give each one it's precedence
const operationsPrecedence = {
    "+": 1,
    "-": 1,
    "×": 2,
    "÷": 2,
    "%": 2
};

// turn infix notation expression into postfix notation expression
function calculate(operation) {
    // turn the operation into an array
    operation = operation.split(/([%÷×−+])/);

    // turn infix into postfix
    let queue = []; // FIFO 123, 123 push(in), shift(out)
    let operationStack = []; // LIFO 123, 321 push(in), pop(out)

    // loop through the operation
    for (let char of operation) {
        // if the current character is a digit push it into the queue
        if (/\d+/.test(char)) {
            queue.push(char);
        }
        // if the current character is an operator
        else if (/[%÷×−+]/.test(char)) {
            // if the stack is empty just push the character
            if (operationStack.length === 0) {
                operationStack.push(char);
            }
            // otherwise the stack is not empty 
            else {
                // compair between the precedence of the current character "which is necesserly an operator" and the one at the top of the stack

                // if the current character has a greater precedence
                if (operationsPrecedence[char] > operationsPrecedence[operationStack[operationStack.length - 1]]) {
                    // push it into the stack
                    operationStack.push(char);

                }
                // else it's equal in precedence or the top operator on the stack is greater precedence
                else {
                    // loop through the stack and push the operator from it to the queue
                    for (let ope of operationStack) {
                        // push the operator into queue
                        queue.push(ope);
                        // remove the operator from the stack
                        operationStack.pop();
                    }
                    operationStack.push(char);
                }
            }
        }
    }
    for (let ope of operationStack) {
        queue.push(ope);
        operationStack.pop()
    }

    // change −, ÷, ×
    queue = queue.toString().replaceAll(",", " "); // turn queue to a string 
    queue = queue
        .replace(/−/g, '-')   // Replace − with -
        .replace(/÷/g, '/')   // Replace ÷ with /
        .replace(/×/g, '*');  // Replace × with *

    queue = queue.split(" "); // get it back to be an array

    // calculat it and return the result

    let resultStack = [];
    let evaluate;

    for (let element of queue) {
        // if we have element is a number then add it to resultStack
        if (/\d+/.test(element)) {
            resultStack.push(element);
        } 
        // otherwise evaluate the two numbers currently in resultStack and add the result to the resultStack again
        else {
            evaluate = resultStack[0];
            evaluate += element;
            evaluate += resultStack[1];
            // overide the reusltStack with a new array has a result of the evaluation
            resultStack = [eval(evaluate)];
        }
    }

    return resultStack[0];
}

const resultDisplay = document.querySelector(".display-result");

buttons.forEach(element => {
    element.addEventListener("click", () => {
        if (element.classList.contains("icon-button")) {
            return;
        } else if ((displayed.textContent === ("0") || /^.+[%÷×−+.]$/.test(displayed.textContent)) && /^[%÷×−+.]$/.test(element.textContent)) {
            return;
        } else if (element.classList.contains("delete")) {
            displayed.textContent = displayed.textContent.slice(0, -1);
            if (displayed.textContent === "") {
                displayed.textContent = "0";
            }
        } else if (element.classList.contains("equals")) {
            if (/^.+[%÷×−+.]$/.test(displayed.textContent)) {
                return
            } else {
                let result = calculate(displayed.textContent);
                resultDisplay.textContent = result;
                displayed.textContent = "0";
            }
        } else if (displayed.textContent === "0") {
            displayed.textContent = "";
            displayElement(element);
        } else {
            displayElement(element);
        }
    });
});
