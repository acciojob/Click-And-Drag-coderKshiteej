const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX, offsetY;

// Set initial positions for grid alignment
const positions = [
  { left: 40, top: 40 },
  { left: 220, top: 40 },
  { left: 40, top: 220 },
  { left: 220, top: 220 }
];

cubes.forEach((cube, index) => {
  cube.style.left = positions[index].left + 'px';
  cube.style.top = positions[index].top + 'px';

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
  });
});

document.addEventListener('mousemove', (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - offsetX - containerRect.left;
    let newTop = e.clientY - offsetY - containerRect.top;

    // Boundary conditions
    newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, container.clientHeight - selectedCube.offsetHeight));

    selectedCube.style.left = newLeft + 'px';
    selectedCube.style.top = newTop + 'px';
  }
});

document.addEventListener('mouseup', () => {
  selectedCube = null;
});
