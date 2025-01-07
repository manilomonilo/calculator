let switchMode = document.querySelector(".icon-button");
let calculator = document.querySelector(".calculator");
let icon = document.querySelector(".icon");
let equal = document.querySelector(".equals");
let calculatorNumbers = document.querySelector(".calculator-buttons");
let buttons = document.querySelectorAll(".button");
let operators = document.querySelectorAll(".operator")
let iconButton = document.querySelector(".button")

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
        console.log("yoooo")
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

// calculating

let displayed = document.querySelector(".calculator-display");

function displayElement(element) {
    displayed.textContent += element.textContent;
}

buttons.forEach(element => {
    element.addEventListener("click", () => {
        if (element.classList.contains("icon-button")) {
            console.log("icon is here");
        } else if(element.classList.contains("delete")){
            return;
        } else if(element.classList.contains("equals")) {
            console.log("equals is here")
        } else if (displayed.textContent === "0") {
            displayed.textContent = "";
            displayElement(element);
        } else {
            displayElement(element);
        }
    });
});


