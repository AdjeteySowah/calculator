function adjustHeight() {
   let innerBody = document.querySelector(".inner-body");
   let vh = window.innerHeight * 0.01;
   innerBody.style.height = `${vh * 100}px`;
}

adjustHeight();

window.addEventListener('resize', adjustHeight);