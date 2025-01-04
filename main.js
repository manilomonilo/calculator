let switchMode = document.querySelector(".icon-button");
let calculator = document.querySelector(".calculator");
let icon = document.querySelector(".icon");
let equal = document.querySelector(".equals");
let calculatorNumbers = document.querySelector(".calculator-buttons");
let buttons = document.querySelectorAll(".button");
let operators = document.querySelectorAll(".operator")

function switchToDarkMood() {
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
