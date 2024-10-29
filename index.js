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

function adjustHeight() {
   let parentDivInBody = document.querySelector(".body-inner");
   let vh = window.innerHeight * 0.01;
   parentDivInBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);