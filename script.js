const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

// When mouse button is pressed
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

// When mouse leaves the container
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// When mouse is released
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// When mouse moves
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Scroll speed
  slider.scrollLeft = scrollLeft - walk;
});
