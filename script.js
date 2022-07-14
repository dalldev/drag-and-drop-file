const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragenter', (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropArea.classList.remove('highlight');

  const files = event.dataTransfer.files;

  [...files].forEach(handleFileRender);
});

function handleFileRender(file) {
  function handleElement(result) {
    const gallery = document.getElementById('gallery');
    let element;

    if (file.type.includes('video')) {
      element = document.createElement('video');
      element.src = result;
      element.controls = true;
    } else if (file.type.includes('image')) {
      element = document.createElement('img');
      element.src = result;
      element.alt = file.name;
    } else {
      element = document.createElement('div');
      element.textContent = `"${file.name}" no soportado `;
    }

    element.classList.add('file');
    gallery.insertAdjacentElement('beforeend', element);
  }

  const render = new FileReader();
  render.onload = () => handleElement(render.result);
  render.readAsDataURL(file);
}
