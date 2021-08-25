let carouselLeftArrow = document.getElementById('leftArrow');
let carouselRightArrow = document.getElementById('rightArrow');

function slideLeft() {
  let menuSlider = document.getElementById('menuSlider');
  menuSlider.classList.remove('slideRight');
  menuSlider.classList.add('slideLeft');
}

function slideRight() {
  let menuSlider = document.getElementById('menuSlider');
  menuSlider.classList.remove('slideLeft');
  menuSlider.classList.add('slideRight');
}

carouselLeftArrow.addEventListener('click', slideLeft);
carouselRightArrow.addEventListener('click', slideRight);
