const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Position cubes in initial grid layout
cubes.forEach((cube, index) => {
  const col = index % 5; // max 5 per row (changeable)
  const row = Math.floor(index / 5);
  cube.style.left = `${col * 110}px`; 
  cube.style.top = `${row * 110}px`;   
});

// Mouse down → start drag
cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Mouse move → drag cube
document.addEventListener("mousemove", (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = selectedCube.offsetWidth;
  const cubeHeight = selectedCube.offsetHeight;

  // New position relative to container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundaries
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeWidth));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeHeight));

  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
});

// Mouse up → release
document.addEventListener("mouseup", () => {
  selectedCube = null;
});
