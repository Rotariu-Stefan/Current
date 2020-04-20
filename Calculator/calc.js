const equation_text = document.getElementById("equationText");  //text showing full current equation
equation_text.innerText = "";
const result_text = document.getElementById("resultText");      //test showing current number/result

const numbers_btn = document.querySelectorAll(".number");       //number(digit) buttons
const opMulti_btn = document.querySelectorAll(".multi");        //operand buttons working with multiple numbers (^ - + / *)
const opSingle_btn = document.querySelectorAll(".single");      //operand buttons working a single number (1/x x^2 sqrt(x))

const equals_btn = document.querySelector(".equals");           //equals button
const control_btn = document.querySelectorAll(".control");      //control buttons (CE, C, Del)

const dot_btn = document.querySelector(".dot");
const sign_btn = document.querySelector(".sign");

let pNumber = 0;        //previous saved number
let cNumber = 0;        //current number being entered
let cOperand = "";      //current operand waiting to be executed
let regexEq = /=\-?\d+$/;
let newnr = true;

numbers_btn.forEach(function (nrb) {        //sets actions on number(digit) button click
    nrb.addEventListener("click", () => handleNumber(nrb.innerText))
});
opSingle_btn.forEach(function (ops) {       //sets actions on single operand button click
    ops.addEventListener("click", () => handleSingleOperand(ops.innerText))
});
opMulti_btn.forEach(function (opm) {        //sets actions on multi operand button click
    opm.addEventListener("click", () => handleMultiOperand(opm.innerText));
});

equals_btn.addEventListener("click", () => handleEquals()); //sets action on equals button click
control_btn.forEach(function (ctr) {        //sets actions on control button click
    ctr.addEventListener("click", () => handleControl(ctr.innerText));
});

sign_btn.addEventListener("click", () => handleSign()); //set action on sign press
dot_btn.addEventListener("click", () => handleDot());   //set action on dot press

const handleNumber = function (nrb) {   //on number button press
    console.log("Number " + nrb);

    if (regexEq.test(equation_text.innerHTML)) {    //tests to see if = was last pressed and starts a new number(reset to 0)
        equation_text.innerHTML = "";
        cNumber = 0;
    }
    if (newnr) {    //if new number was made set result_text to current number(don't add more)
        result_text.setAttribute("value", nrb);
        newnr = false;
    }
    else
        result_text.setAttribute("value", result_text.getAttribute("value") + nrb); //else add digit to current number
    cNumber = Number(result_text.getAttribute("value"));
}

const handleSingleOperand = function (opr) {    //on single operand button press = performs Op on Current Number(NOT Whole Equation) then performs the rest of the equation and shows result
    console.log("Single " + opr);

    switch (opr) {
        case "1/X":
            equation_text.innerText += `(1/${cNumber})`;
            cNumber = Math.round((1 / cNumber + Number.EPSILON) * 100) / 100;
            break;
        case "X2":
            equation_text.innerText += `(${cNumber}^2)`;
            cNumber = Math.round((cNumber * cNumber + Number.EPSILON) * 100) / 100;
            break;
        case "√X":
            equation_text.innerText += `(√${cNumber})`;
            cNumber = Math.round((Math.sqrt(cNumber) + Number.EPSILON) * 100) / 100;
            break;
    }
    handleEquals();     //calls equals button

    newnr = true;       //sets newnr so next time number button is pressed a new equation starts over
}

const handleMultiOperand = function (opr) {     //on multi operand button press
    console.log("Multi " + opr);

    if (equation_text.innerHTML === "")         //1st adds the current number if equation is empty(start of eq)
        equation_text.innerText += cNumber;
    if (cOperand === "") {                      //if there is no multi op saved it adds it to equation
        pNumber = cNumber;
        equation_text.innerText += opr;
    }
    else {                                      //else does the math and adds the result plus new op to equation
        pNumber = doMath();
        equation_text.innerText += cNumber + opr;
    }
    cOperand = opr;
    result_text.setAttribute("value", pNumber);     //changes result
    cNumber = 0;

    newnr = true;                               //sets newnr so next time number button is pressed a new equation starts over
}

const doMath = function () {    //returns result based on 2 saved numbers and saved operand (has up to 2decimal precision)
    switch (cOperand) {
        case "^":
            return Math.round((Math.pow(pNumber, cNumber) + Number.EPSILON) * 100) / 100;
        case "/":
            return Math.round((pNumber / cNumber + Number.EPSILON) * 100) / 100;
        case "*":
            return Math.round((pNumber * cNumber + Number.EPSILON) * 100) / 100;
        case "-":
            return Math.round((pNumber - cNumber + Number.EPSILON) * 100) / 100;
        case "+":
            return Math.round((pNumber + cNumber + Number.EPSILON) * 100) / 100;
    }
}

const handleEquals = function () {  //process result on = press
    console.log("Equals");

    if (cOperand === "")    //if there is no op saved treat treats current number as equation so far
        pNumber = cNumber;        
    else {                  //else does the math
        let temp = cNumber; 
        cNumber = doMath();
        pNumber = temp;
    }
    result_text.setAttribute("value", cNumber);
    equation_text.innerText += pNumber + "=" + cNumber;
    cOperand = "";

    newnr = true;           //sets newnr so next time number button is pressed a new equation starts over
}

const handleControl = function (ctr) {  //process result on CE, C, Del presses
    console.log("Control " + ctr);

    switch (ctr) {
        case "CE":
            cNumber = 0;
            break;
        case "C":
            cNumber = 0;
            pNumber = 0;
            cOperand = "";
            equation_text.innerText = "";
            break;
        case "<=":
            let str = result_text.getAttribute("value").slice(0, -1);
            if (Math.abs(cNumber) < 10)
                cNumber = 0;
            else
                cNumber = Number(str);
            break;
    }
    result_text.setAttribute("value", cNumber);
}

const handleSign = function () {       //changes sign on current number
    console.log("Sign");

    cNumber = -cNumber;
    result_text.setAttribute("value", cNumber);
}

const handleDot = function () {         //handles dot press
    console.log("Dot");

    if (regexEq.test(equation_text.innerHTML)) {    //if = was last pressed resets equation(much like a number press)
        equation_text.innerHTML = "";
        cNumber = 0;
    }
    if (newnr) {        //if newnr is to start then set current value to 0.
        result_text.setAttribute("value", "0.");
        newnr = false;
    }
    else if (!result_text.getAttribute("value").includes("."))  //else add a dot if a dot wasn't already added
        result_text.setAttribute("value", result_text.getAttribute("value") + ".");
    cNumber = Number(result_text.getAttribute("value"));
}