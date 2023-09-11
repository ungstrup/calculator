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
        let num;
        for (let i = 1; i < length;){
            console.log("this is run: " + i+1);
            let a = +split[0];
            let operator = split[1];
            let b = +split[2];
            console.log(a, operator, b);
            if (operator === "/" && b === 0) return "Don't divide by zero";
            if (!this.operators[operator] || isNaN(a) || isNaN(b)) return NaN;
            num = this.roundToFour(this.operators[operator](a, b));
            console.log(num);
            split.splice(0, 3, num);
            console.log(split);
            length = split.length;
        };
        return num;
    },

}

console.log(calculator.operate("12 + 16 + 12 + 2 + 3 / 0"));
console.log(calculator.operate("12 * 16"));
console.log(calculator.operate("12 - 16"));
console.log(calculator.operate("12 / 13"));
console.log(calculator.operate("12 16"));
console.log(calculator.operate("12 / 0"));