const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Position cubes initially in grid layout
cubes.forEach((cube, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  cube.style.left = `${col * 110}px`; // 100px cube + 10px gap
  cube.style.top = `${row * 110}px`;
});

// Mouse down → select cube
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

  // Calculate new position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeWidth));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeHeight));

  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
});

// Mouse up → release cube
document.addEventListener("mouseup", () => {
  selectedCube = null;
});
