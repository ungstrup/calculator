const display = document.getElementById('dummy-display');
const sum = document.querySelector('#equalbtn');
const reset = document.querySelector('#clrbtn');
const buttons = document.querySelectorAll('.calc-button');

let total = "";
let operatorClicked = 0;

document.addEventListener("keydown", (e) => {
    if (e.key == "." || (e.key >= 0 && e.key <= 9) || e.key == "+" || e.key == "*" || e.key == "-" || e.key == "/") {
        e.preventDefault();
        document.getElementById(e.key + "btn").click();
    } else if (e.key == "Enter" || e.key == "="){
        e.preventDefault();
        document.getElementById("equalbtn").click();
    } else if (e.key == "Backspace") {
        e.preventDefault();
        document.getElementById("bckbtn").click();
    };
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent === "Don't divide by zero" || display.textContent === "Error" || display.textContent === "0"){
            display.textContent = "";
            total = "";
        };
        if (operatorClicked === 1){
            display.textContent = "";
            operatorClicked = 0;
        };
        if (button.value == "bck" && (total.charAt(total.length-1) != (" " || ""))){
            total = total.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        } else if (button.value == "." && display.textContent.includes(".")){
            return;
        } else if ((button.value == "/" || button.value == "*" || button.value == "-" || button.value == "+") && (total.includes("/") || total.includes("*") || total.includes("-") || total.includes("+"))) {
            total = calculator.operate(total);
            display.textContent = total;
            total += " " + button.value + " ";
            operatorClicked = 1;
            buttons.forEach((button) => {
                button.classList.remove("highlightbtn");
            });
            button.classList.add("highlightbtn");
        } else if (button.value == "/" || button.value == "*" || button.value == "-" || button.value == "+") {
            total += " " + button.value + " ";
            display.textContent = "";
            operatorClicked = 1;
            buttons.forEach((button) => {
                button.classList.remove("highlightbtn");
            });
            button.classList.add("highlightbtn");
        } else {
            total += button.value;
            display.textContent += button.value;
        };
    });
});

sum.addEventListener('click', () => {
    total = calculator.operate(total);
    display.textContent = total;
    operatorClicked = 0;
    buttons.forEach((button) => {
        button.classList.remove("highlightbtn");
    });
});

reset.addEventListener('click', () => {
    display.textContent = "0";
    total = "";
    operatorClicked = 0;
    buttons.forEach((button) => {
        button.classList.remove("highlightbtn");
    });
});

let calculator = {
    operators: {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    },
    roundToFour: function(num){
        return +(Math.round(num + "e" + 4) + "e-" + 4);
    },
    operate: function (str) {
        let split = str.split(" ");
        if (split.length === 1) return str;
        let num = str;
        let a = +split[0];
        let operator = split[1];
        let b = +split[2];
        if (operator === "/" && b === 0) return "Don't divide by zero";
        if (!this.operators[operator] || isNaN(a) || isNaN(b)) return "Error";
        num = this.roundToFour(this.operators[operator](a, b));  
        return num.toString();
    },
};