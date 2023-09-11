const display = document.getElementById('dummy-display');
const sum = document.querySelector('#equal-button');
const reset = document.querySelector('#clr-button');
const buttons = document.querySelectorAll('.calc-button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent === "Don't divide by zero" || display.textContent === "Error" || display.textContent === "0"){
            display.textContent = "";
        };
        if (button.value == "/" || button.value == "*" || button.value == "-" || button.value == "+") {
            display.textContent += " " + button.value + " ";
        } else display.textContent += button.value;
    });
});

sum.addEventListener('click', () => {
    let calc = calculator.operate(display.textContent)
    display.textContent = calc;
});

reset.addEventListener('click', () => {
    display.textContent = "";
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
        let length = split.length;
        let num = str;
        for (let i = 1; i < length;){
            let a = +split[0];
            let operator = split[1];
            let b = +split[2];
            if (operator === "/" && b === 0) return "Don't divide by zero";
            if (!this.operators[operator] || isNaN(a) || isNaN(b)) return "Error";
            num = this.roundToFour(this.operators[operator](a, b));
            split.splice(0, 3, num);
            length = split.length;
        };
        return num;
    },
};