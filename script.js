const container = document.getElementById('container');
const cubes = document.querySelectorAll('.items'); // <-- FIXED

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.position = 'absolute';
    cube.style.left = rect.left - containerRect.left + 'px';
    cube.style.top = rect.top - containerRect.top + 'px';
    cube.style.width = rect.width + 'px';
    cube.style.height = rect.height + 'px';
    cube.classList.add('dragging');

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
  });
});

function drag(e) {
  if (!activeCube) return;
  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  // Keep cube inside container
  left = Math.max(0, Math.min(left, containerRect.width - cubeRect.width));
  top = Math.max(0, Math.min(top, containerRect.height - cubeRect.height));

  activeCube.style.left = left + 'px';
  activeCube.style.top = top + 'px';
}

function drop() {
  if (!activeCube) return;
  activeCube.classList.remove('dragging');
  activeCube = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', drop);
}
