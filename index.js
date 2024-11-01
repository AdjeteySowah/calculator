   // AC, clear/backspace, percent, and equals functions
let allCleared = document.querySelector(".all-clear-btn");
allCleared.addEventListener("click", () => {
   outputArray = [];
   firstFiltration = [];
   secondFiltration = [];
   screenBtnClickEventNodes = [];
   outputTopSection.textContent = "0";
});

let backspace = document.querySelector(".backspace-btn");
backspace.addEventListener("click", () => {
   outputArray.pop();
   firstFiltration.pop();
   secondFiltration.pop();
   screenBtnClickEventNodes.pop();

   if (outputArray.length > 0) {
      outputTopSection.textContent = outputArray.join("");
   } else {
      outputTopSection.textContent = "0";
   }
});

// let percent = document.querySelector(".percentage-btn");
// percent.addEventListener("click", () => {

// });

let populatableButtons = document.querySelectorAll(".screen-btn");
populatableButtons.forEach((button) => {
   button.addEventListener("click", getAndDisplayBtnTextContent);
});

let outputTopSection = document.querySelector(".output--top-section");
let outputArray = [];
let screenBtnClickEventNodes = [];

function getAndDisplayBtnTextContent(event) {
   screenBtnClickEventNodes.push(event.target);

   if (event.target.classList.contains("numeric")) {
      outputArray.push(event.target.textContent);
   } else if (event.target.classList.contains("point-btn")
             &&
             screenBtnClickEventNodes.length > 1
             &&
             screenBtnClickEventNodes[screenBtnClickEventNodes.length - 2].classList.contains("numeric")) {
      outputArray.push(event.target.textContent);
   } else if (event.target.classList.contains("point-btn")) {
      let zeroConcat = "0" + ".";
      outputArray.push(zeroConcat);
   } else {
      outputArray.push(event.target.textContent)
   }

   outputTopSection.textContent = outputArray.join("");

   decipherNumAndOperator(event);
}


let firstFiltration = [];
let secondFiltration = [];
let thirdFiltration = [];

let firstNumber;
let operator;
let secondNumber;

function decipherNumAndOperator(event) {
   // screenBtnClickEventNodes.push(event.target);

   let classes = Array.from(event.target.classList);

   classes.forEach((className) => {
      switch (className) {
         case "sign" :
   
            let signVariable = event.target.textContent;
            function parseMathOperator(sign) {
               sign = sign
               .replace("＋", "+")
               .replace("−", "-")
               .replace("×", "*")
               .replace("÷", "/");
   
               return sign;
            }
            firstFiltration.push(parseMathOperator(signVariable));
   
            break;
   
         case "num" :
   
            firstFiltration.push(event.target.textContent);
            firstNumber = parseFloat(firstFiltration.join(""));
   
            break;
      }
   });
   console.log(outputArray);

   if (firstFiltration.length > 0 && outputArray[0] !== "0." && typeof(firstNumber) === "number") {
      if (event.target.classList.contains("sign")) {
         secondFiltration.push(event.target.textContent);
         operator = secondFiltration[secondFiltration.length-1];
      }
   }
   console.log(firstFiltration);
   console.log(secondFiltration);

   
}


function add(...args) {
   let additionOutput = args.reduce((sum, nextNumber) => {
      return sum + nextNumber;
   });

   return additionOutput;
}

function subtract(...args) {
   let subtractionOutput = args.reduce((remainder, nextNumber) => {
      return remainder - nextNumber;
   });

   return subtractionOutput;
}

function multiply(...args) {
   let multiplicationOutput = args.reduce((product, nextNumber) => {
      return product * nextNumber;
   });

   return multiplicationOutput;
}

function divide(...args) {
   let divisionOutput = args.reduce((quotient, nextNumber) => {
      return quotient / nextNumber;
   });

   return divisionOutput;
}






let operators = document.querySelectorAll(".sign");

function operate(firstNumber, secondNumber) {
   operators.forEach((operator) => {
      let classes = Array.from(operator.classList);

      classes.forEach((className) => {
         switch (className) { 
            case "plus-btn" :
               add(firstNumber, secondNumber)
               break;
            case "minus-btn" :
               subtract(firstNumber, secondNumber)
               break;
            case "multiplication-btn" :
               multiply(firstNumber, secondNumber)
               break;
            case "division-btn" :
               divide(firstNumber, secondNumber)
               break;
         }
      });
   });
   
}

function adjustHeight() {
   let parentDivInBody = document.querySelector(".body-inner");
   let vh = window.innerHeight * 0.01;
   parentDivInBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);