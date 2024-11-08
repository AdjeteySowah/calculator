   // AC, clear/backspace, percent, and equals functions
let allCleared = document.querySelector(".all-clear-btn");
allCleared.addEventListener("click", () => {
   outputArray = [];
   firstFiltration = [];
   secondFiltration = [];
   screenBtnClickEventNodes = [];
   outputTopSection.textContent = "0";

   let operators = document.querySelectorAll(".sign");
   operators.forEach((operator) => {
      operator.addEventListener("click", getAndDisplayBtnTextContent);
   });
});

let backspace = document.querySelector(".backspace-btn");
backspace.addEventListener("click", () => {
   screenBtnClickEventNodes.pop();
   
   if (thirdFiltration.length > 0) {
      secondNumber = secondNumber.toString();
      secondNumber = secondNumber.split("");
      let poppedItem = secondNumber.pop();
      if (thirdFiltration[thirdFiltration.length-1] === ".") {
         thirdFiltration.pop();
         secondNumber.push(poppedItem);
      } else {
         thirdFiltration.pop();
      }
      secondNumber = parseFloat(secondNumber.join(""));
      outputArray.pop();
      evaluateCalculation();

   } else if (secondFiltration.length > 1 && outputArray.length === 2) {
      secondFiltration.pop();
      secondFiltration.pop();
      outputArray.pop();
   } else if (firstFiltration.length > 0 && outputArray.length === 1) {
      outputArray = [...outputArray[0]];
      firstFiltration.pop();
      outputArray.pop();
   } else if (outputArray.length > firstFiltration.length) {
      secondFiltration.pop();
      outputArray.pop();
   } else {
      firstFiltration.pop();
      outputArray.pop();
   }

   if (outputArray.length > 0) {
      outputTopSection.textContent = outputArray.join("");
   } else {
      outputTopSection.textContent = "0";
   }

   let operators = document.querySelectorAll(".sign");
   operators.forEach((operator) => {
      operator.addEventListener("click", getAndDisplayBtnTextContent);
   });
});

// let percent = document.querySelector(".percentage-btn");
// percent.addEventListener("click", () => {

// });

// let equals = document.querySelector(".equals-btn");



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
      // firstFiltration.push(zeroConcat);
   } else {
      outputArray.push(event.target.textContent)
   }

   evaluateAndChainCalculation(event);

   outputTopSection.textContent = outputArray.join("");

   decipherNumAndOperator(event);

   evaluateCalculation();

   allowOnlyOnePointInNumber();
}

point = document.querySelector(".point");

function allowOnlyOnePointInNumber() {
   if (thirdFiltration.includes(".")) {
      point.removeEventListener("click", getAndDisplayBtnTextContent);
   } else if (secondFiltration.length > 0 && !thirdFiltration.includes(".")) {
      point.removeEventListener("click", getAndDisplayBtnTextContent);
      point.addEventListener("click", getAndDisplayBtnTextContent);
   } else if (secondFiltration.length > 0) {
      point.addEventListener("click", getAndDisplayBtnTextContent);
   } else if (firstFiltration.includes(".")) {
      point.removeEventListener("click", getAndDisplayBtnTextContent);
   }
}


let firstFiltration = [];
let secondFiltration = [];
let thirdFiltration = [];

let firstNumber;
let operator;
let secondNumber;

function decipherNumAndOperator(event) {
   let classes = Array.from(event.target.classList);

      // getting the 1st number
   classes.forEach((className) => {
      if (className === "sign") {

         let signVariable = event.target.textContent;
            if (firstFiltration.length === 0 &&
               !firstFiltration.includes("+") &&
               !firstFiltration.includes("-") &&
               !firstFiltration.includes("*") &&
               !firstFiltration.includes("/")) {
                  function parseMathOperator(sign) {
                     return sign
                        .replace("+", "+")
                        .replace("−", "-")
                        .replace("×", "*")
                        .replace("÷", "/");
                  }
                  firstFiltration.push(parseMathOperator(signVariable));
            }
      } else if (className === "num" && secondFiltration.length === 0 &&
                (!firstFiltration.includes("+") &&
                !firstFiltration.includes("-") &&
                !firstFiltration.includes("*") &&
                !firstFiltration.includes("/"))) {

                  firstFiltration.push(event.target.textContent);
                  firstNumber = parseFloat(firstFiltration.join(""));        

      } else if (className === "num"
                &&
                screenBtnClickEventNodes[0].classList.contains("sign")) {

                  firstFiltration.pop();
                  firstFiltration.push("0");
                  firstNumber = parseFloat(firstFiltration.join(""));

                  secondFiltration.pop();
                  secondFiltration.push(screenBtnClickEventNodes[0].textContent);
                  operator = secondFiltration.join("");         
      }
   });


      // getting the operator
   if (firstFiltration.length > 0 
      && firstFiltration.join("") !== "0."
      && typeof(firstNumber) === "number") {
         if (event.target.classList.contains("sign") && secondFiltration.length < 2) {

            secondFiltration.push(event.target.textContent);

            if ((secondFiltration[0] === "×" || secondFiltration === "÷")
               && secondFiltration[1] === "−") {
                  secondFiltration[1] = secondFiltration[1].replace("−", "-");
                  operator = secondFiltration[0];
                  thirdFiltration.push(secondFiltration[1]);

                  let operators = document.querySelectorAll(".sign");
                  operators.forEach((operator) => {
                     operator.removeEventListener("click", getAndDisplayBtnTextContent);
                  });

            } else if ((secondFiltration[0] === "+" ||
                        secondFiltration[0] === "−" ||
                        secondFiltration[0] === "×" ||
                        secondFiltration[0] === "÷") && 
                       (secondFiltration[1] === "+" ||
                        secondFiltration[1] === "−" || 
                        secondFiltration[1] === "×" || 
                        secondFiltration[1] === "÷") &&
                        firstFiltration[0] === ".") {

                           outputTopSection.textContent = "";
                           outputArray = ["0"];
                           outputArray.push(firstFiltration.join(""));
                           outputArray.push(event.target.textContent);
                           outputTopSection.textContent = outputArray.join("");
                           operator = secondFiltration[1];

                           let operators = document.querySelectorAll(".sign");
                           operators.forEach((operator) => {
                              operator.removeEventListener("click", getAndDisplayBtnTextContent);
                           });

            } else if ((secondFiltration[0] === "+" ||
                        secondFiltration[0] === "−" ||
                        secondFiltration[0] === "×" ||
                        secondFiltration[0] === "÷") && 
                       (secondFiltration[1] === "+" ||
                        secondFiltration[1] === "−" || 
                        secondFiltration[1] === "×" || 
                        secondFiltration[1] === "÷")) {

                           outputTopSection.textContent = "";
                           outputArray = [];
                           outputArray.push(firstFiltration.join(""));
                           outputArray.push(event.target.textContent);
                           outputTopSection.textContent = outputArray.join("");
                           operator = secondFiltration[1];

                           let operators = document.querySelectorAll(".sign");
                           operators.forEach((operator) => {
                              operator.removeEventListener("click", getAndDisplayBtnTextContent);
                           });
            } else {
            operator = secondFiltration[0];
            }
         }
   }


      // getting the 2nd number
   if (secondFiltration.length > 0 && event.target.classList.contains("num")) {
      thirdFiltration.push(event.target.textContent);
      secondNumber = parseFloat(thirdFiltration.join(""));

      let operators = document.querySelectorAll(".sign");
      operators.forEach((operator) => {
         operator.addEventListener("click", getAndDisplayBtnTextContent);
      });
   }



   // console.log(outputArray); 
   // console.log(firstNumber); 
   console.log(operator); 
   console.log(secondNumber);

   operate(firstNumber, secondNumber);
}



function operate(firstNumber, secondNumber) {
   switch (operator) { 
      case "+" :
         add(firstNumber, secondNumber);
         break;
      case "−" :
         subtract(firstNumber, secondNumber);
         break;
      case "×" :
         multiply(firstNumber, secondNumber);
         break;
      case "÷" :
         divide(firstNumber, secondNumber);
         break;
   }
}

function add(firstNumber, secondNumber) {
   let additionOutput = firstNumber + secondNumber;
   return additionOutput;
}

function subtract(firstNumber, secondNumber) {
   let subtractionOutput = firstNumber - secondNumber;
   return subtractionOutput;
}

function multiply(firstNumber, secondNumber) {
   let multiplicationOutput = firstNumber * secondNumber;
   return multiplicationOutput;
}

function divide(firstNumber, secondNumber) {
   let divisionOutput = firstNumber / secondNumber;
   return divisionOutput;
}



function evaluateAndChainCalculation(event) {
   if (firstFiltration.length > 0 &&
       typeof(operator) === "string" &&
       thirdFiltration.length > 0 &&
       event.target.classList.contains("sign")) {
         outputTopSection.textContent = "";
         outputArray = [];
         if (operator === "+") {
            firstFiltration = [];
            firstFiltration.push(add(firstNumber, secondNumber).toString());
            firstNumber = parseFloat(firstFiltration.join(""));
            secondFiltration = [];
            thirdFiltration = [];
         } else if (operator === "−") {
            firstFiltration = [];
            firstFiltration.push(subtract(firstNumber, secondNumber).toString());
            firstNumber = parseFloat(firstFiltration.join(""));
            secondFiltration = [];
            thirdFiltration = [];
         } else if (operator === "×") {
            firstFiltration = [];
            firstFiltration.push(multiply(firstNumber, secondNumber).toString());
            firstNumber = parseFloat(firstFiltration.join(""));
            secondFiltration = [];
            thirdFiltration = [];
         } else {
            firstFiltration = [];
            firstFiltration.push(divide(firstNumber, secondNumber).toString());
            firstNumber = parseFloat(firstFiltration.join(""));
            secondFiltration = [];
            thirdFiltration = [];
         }
         outputArray.push(firstFiltration.join(""));
         outputArray.push(event.target.textContent);
       }
}



let outputBottomSection = document.querySelector(".output--bottom-section");

function evaluateCalculation() {
   if (isNaN(secondNumber) === true) {
      outputBottomSection.textContent = "...";
    } else if (firstFiltration.length > 0 &&
               typeof(operator) === "string" &&
               thirdFiltration.length > 0) {
            if (operator === "+") {
               outputBottomSection.textContent = add(firstNumber, secondNumber);
            } else if (operator === "−") {
               outputBottomSection.textContent = subtract(firstNumber, secondNumber);
            } else if (operator === "×") {
               outputBottomSection.textContent = multiply(firstNumber, secondNumber);
            } else {
               outputBottomSection.textContent = divide(firstNumber, secondNumber);
            }
       } else if (thirdFiltration.length === 0) {
         outputBottomSection.textContent = "";
       }
}



function adjustHeight() {
   let parentDivInBody = document.querySelector(".body-inner");
   let vh = window.innerHeight * 0.01;
   parentDivInBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);