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

// let backspace = document.querySelector(".backspace-btn");
// backspace.addEventListener("click", () => {
//    screenBtnClickEventNodes.pop();
   
//    if (thirdFiltration.length > 0) {
//       thirdFiltration.pop();
//       outputArray.pop();
//       console.log(outputArray);
//       console.log(thirdFiltration);
//       console.log(1);
//    } else if (secondFiltration.length > out) {
//       secondFiltration.pop();
//       secondFiltration.pop();
//       outputArray.pop();
//       console.log(secondFiltration);
//       console.log(2);
//    } else if (firstFiltration.length > 0) {
//       firstFiltration.pop();
//       // outputArray.pop();
//       console.log(firstFiltration);
//       console.log(3);
//    } else {
//       firstFiltration.pop();
//    }

//    if (outputArray.length > 0) {
//       outputTopSection.textContent = outputArray.join("");
//    } else {
//       outputTopSection.textContent = "0";
//    }

//    let operators = document.querySelectorAll(".sign");
//    operators.forEach((operator) => {
//       operator.addEventListener("click", getAndDisplayBtnTextContent);
//    });
// });

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
      // firstFiltration.push(zeroConcat);
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
                (!firstFiltration.includes("+") ||
                !firstFiltration.includes("-") ||
                !firstFiltration.includes("*") ||
                !firstFiltration.includes("/"))) {

                  firstFiltration.push(event.target.textContent);
                  firstNumber = parseFloat(firstFiltration.join(""));        

      } else if (className === "num"
                &&
                isNaN(parseFloat(firstFiltration.join(""))) === true
                &&
                screenBtnClickEventNodes[screenBtnClickEventNodes.length-2].classList.contains("sign")) {

                  firstFiltration.pop();
                  firstFiltration.push("0");
                  firstNumber = parseFloat(firstFiltration.join(""));           
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
   }



   console.log(outputArray); 
   // console.log(firstFiltration); 
   // console.log(secondFiltration); 
   // console.log(thirdFiltration);

   
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






// function operate(firstNumber, secondNumber) {
//    operators.forEach((operator) => {
//       let classes = Array.from(operator.classList);

//       classes.forEach((className) => {
//          switch (className) { 
//             case "plus-btn" :
//                add(firstNumber, secondNumber)
//                break;
//             case "minus-btn" :
//                subtract(firstNumber, secondNumber)
//                break;
//             case "multiplication-btn" :
//                multiply(firstNumber, secondNumber)
//                break;
//             case "division-btn" :
//                divide(firstNumber, secondNumber)
//                break;
//          }
//       });
//    });
   
// }

function adjustHeight() {
   let parentDivInBody = document.querySelector(".body-inner");
   let vh = window.innerHeight * 0.01;
   parentDivInBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);