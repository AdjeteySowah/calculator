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

let firstNumber;
let operator;
let secondNumber;

function operate(operator, firstNumber, secondNumber) {
   switch (operator) { /* update operator later*/
      case "+" : /* update all cases later*/
         add(firstNumber, secondNumber)
         break;
      case "-" :
         subtract(firstNumber, secondNumber)
         break;
      case "*" :
         multiply(firstNumber, secondNumber)
         break;
      case "/" :
         divide(firstNumber, secondNumber)
         break;
   }
}

let outputTopSection = document.querySelector(".output--top-section");
let outputArray = [];

function getAndDisplayBtnTextContent(event) {
      outputArray.push(event.target.textContent);
      outputTopSection.textContent = outputArray.join("");
}

let populatableButtons = document.querySelectorAll(".screen-btn");
populatableButtons.forEach((button) => {
   button.addEventListener("click", getAndDisplayBtnTextContent);
});

function adjustHeight() {
   let parentDivInBody = document.querySelector(".body-inner");
   let vh = window.innerHeight * 0.01;
   parentDivInBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);